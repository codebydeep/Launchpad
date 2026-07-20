pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "3453458134/app-frontend:latest"
        BACKEND_IMAGE  = "3453458134/app-backend:latest"
    }

    stages {

        // ── 1. Checkout ───────────────────────────────────────────────────────
        stage("Checkout") {
            steps {
                git branch: "main", url: "https://github.com/codebydeep/Launchpad.git"
            }
        }

        // ── 2. Docker Build & Push ────────────────────────────────────────────
        stage("Docker Build & Push") {
            steps {
                script {
                    // Verify jenkins user can reach Docker — fail fast with a clear message
                    sh '''
                        if ! docker info > /dev/null 2>&1; then
                            echo "ERROR: Jenkins cannot connect to Docker daemon."
                            echo "Fix: add jenkins user to docker group -> sudo usermod -aG docker jenkins && sudo systemctl restart jenkins"
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

                        # Build and push frontend
                        docker build -t $FRONTEND_IMAGE ./client
                        docker push $FRONTEND_IMAGE

                        # Build and push backend
                        docker build -t $BACKEND_IMAGE ./server
                        docker push $BACKEND_IMAGE

                        docker logout
                    '''
                }
            }
        }

        // ── 3. Terraform Init ─────────────────────────────────────────────────
        stage("Terraform Infra creation") {
            steps {
                dir("terraform") {
                    sh "terraform init -reconfigure"
                }
            }
        }

        // ── 4. Terraform Plan ─────────────────────────────────────────────────
        stage("Terraform Plan") {
            steps {
                dir("terraform") {
                    sh "terraform plan"
                }
            }
        }

        // ── 5. Terraform Apply ────────────────────────────────────────────────
        stage("Terraform Apply") {
            steps {
                dir("terraform") {
                    sh "terraform apply -auto-approve"
                }
            }
        }

        // ── 6. Verify Deployment ──────────────────────────────────────────────
        stage("Verify Deployment") {
            steps {
                dir("terraform") {
                    script {
                        def ip = sh(
                            script: "terraform output -raw instance_public_ip",
                            returnStdout: true
                        ).trim()

                        echo "EC2 Public IP: ${ip}"
                        echo "Waiting for frontend to become available at http://${ip}:3000 ..."

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
                                echo "✅ Frontend is up at http://${ip}:3000"
                                success = true
                                break
                            }

                            if (i < maxAttempts) {
                                sleep(waitSeconds)
                            }
                        }

                        if (!success) {
                            error("❌ Frontend did not respond after ${maxAttempts} attempts. Check EC2 user_data logs: /var/log/user-data.log")
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully."
        }
        failure {
            echo "❌ Pipeline failed. Check stage logs above."
        }
        always {
            sh "docker logout || true"
        }
    }
}
