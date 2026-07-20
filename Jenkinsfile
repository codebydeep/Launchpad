pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "3453458134/app-frontend:latest"
        BACKEND_IMAGE  = "3453458134/app-backend:latest"
        SSH_USER       = "ec2-user"
    }

    stages {

        stage("Checkout") {
            steps {
                git branch: "main", url: "https://github.com/codebydeep/Launchpad.git"
            }
        }

        stage("Docker Build & Push") {
            steps {
                script {
                    sh '''
                        if ! docker info > /dev/null 2>&1; then
                            echo "ERROR: Jenkins cannot reach Docker. Run: sudo usermod -aG docker jenkins && sudo systemctl restart jenkins"
                            exit 1
                        fi
                    '''
                }
                withCredentials([usernamePassword(
                    credentialsId: "dockerhub-creds",
                    usernameVariable: "DOCKER_USER",
                    passwordVariable: "DOCKER_PASS"
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker build -t $FRONTEND_IMAGE ./client
                        docker push $FRONTEND_IMAGE

                        docker build -t $BACKEND_IMAGE ./server
                        docker push $BACKEND_IMAGE

                        docker logout
                    '''
                }
            }
        }

        stage("Terraform Infra creation") {
            steps {
                dir("terraform") {
                    sh "terraform init -reconfigure"
                }
            }
        }

        stage("Terraform Plan") {
            steps {
                dir("terraform") {
                    sh "terraform plan"
                }
            }
        }

        stage("Terraform Apply") {
            steps {
                dir("terraform") {
                    sh "terraform apply -auto-approve"
                }
            }
        }

        stage("Deploy via SSH") {
            steps {
                dir("terraform") {
                    script {
                        def ip = sh(
                            script: "terraform output -raw instance_public_ip",
                            returnStdout: true
                        ).trim()

                        echo "Deploying to EC2 at ${ip}"

                        withCredentials([sshUserPrivateKey(
                            credentialsId: "ec2-ssh-key",
                            keyFileVariable: "SSH_KEY"
                        )]) {
                            sh """
                                chmod 400 \$SSH_KEY

                                echo "Waiting for SSH to become available..."
                                for i in \$(seq 1 20); do
                                    ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -i \$SSH_KEY ${SSH_USER}@${ip} "echo ok" && break
                                    echo "Attempt \$i/20 - retrying in 15s..."
                                    sleep 15
                                done

                                scp -o StrictHostKeyChecking=no -i \$SSH_KEY \
                                    ../terraform/scripts/deploy.sh \
                                    ${SSH_USER}@${ip}:/tmp/deploy.sh

                                ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${SSH_USER}@${ip} \
                                    "chmod +x /tmp/deploy.sh && /tmp/deploy.sh"
                            """
                        }
                    }
                }
            }
        }

        stage("Verify Deployment") {
            steps {
                dir("terraform") {
                    script {
                        def ip = sh(
                            script: "terraform output -raw instance_public_ip",
                            returnStdout: true
                        ).trim()

                        def maxAttempts = 20
                        def waitSeconds = 15
                        def success = false

                        for (int i = 1; i <= maxAttempts; i++) {
                            echo "Attempt ${i}/${maxAttempts}..."
                            def status = sh(
                                script: "curl -sf http://${ip}:3000 > /dev/null 2>&1 && echo OK || echo FAIL",
                                returnStdout: true
                            ).trim()

                            if (status == "OK") {
                                echo "Frontend is up at http://${ip}:3000"
                                success = true
                                break
                            }

                            if (i < maxAttempts) {
                                sleep(waitSeconds)
                            }
                        }

                        if (!success) {
                            error("Frontend did not respond after ${maxAttempts} attempts.")
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }
        failure {
            echo "Pipeline failed."
        }
        always {
            sh "docker logout || true"
        }
    }
}
