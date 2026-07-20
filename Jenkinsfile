pipeline {
    agent any

    environment {
        SSH_USER = "ec2-user"
    }

    stages {

        stage("Checkout") {
            steps {
                git branch: "main", url: "https://github.com/codebydeep/Launchpad.git"
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
                    withCredentials([string(credentialsId: "tf-public-key", variable: "TF_PUBLIC_KEY")]) {
                        sh "terraform plan -var='public_key=${TF_PUBLIC_KEY}'"
                    }
                }
            }
        }

        stage("Terraform Apply") {
            steps {
                dir("terraform") {
                    withCredentials([string(credentialsId: "tf-public-key", variable: "TF_PUBLIC_KEY")]) {
                        sh "terraform apply -auto-approve -var='public_key=${TF_PUBLIC_KEY}'"
                    }
                }
            }
        }

        stage("Read Infra Outputs") {
            steps {
                dir("terraform") {
                    script {
                        env.EC2_IP = sh(
                            script: "terraform output -raw instance_public_ip",
                            returnStdout: true
                        ).trim()
                        echo "EC2 IP: ${env.EC2_IP}"
                    }
                }
            }
        }

        stage("Deploy via SSH") {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: "ec2-ssh-key",
                    keyFileVariable: "SSH_KEY"
                )]) {
                    sh """
                        chmod 400 \$SSH_KEY

                        echo "Waiting for SSH on ${env.EC2_IP}..."
                        for i in \$(seq 1 20); do
                            ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -i \$SSH_KEY ${SSH_USER}@${env.EC2_IP} "echo ok" && break
                            echo "Attempt \$i/20 - retrying in 15s..."
                            sleep 15
                        done

                        scp -o StrictHostKeyChecking=no -i \$SSH_KEY \
                            terraform/scripts/deploy.sh \
                            ${SSH_USER}@${env.EC2_IP}:/tmp/deploy.sh

                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${SSH_USER}@${env.EC2_IP} \
                            "chmod +x /tmp/deploy.sh && /tmp/deploy.sh"
                    """
                }
            }
        }

        stage("Verify Deployment") {
            steps {
                script {
                    def maxAttempts = 20
                    def waitSeconds = 15
                    def success = false

                    for (int i = 1; i <= maxAttempts; i++) {
                        echo "Attempt ${i}/${maxAttempts}..."
                        def status = sh(
                            script: "curl -sf http://${env.EC2_IP}:3000 > /dev/null 2>&1 && echo OK || echo FAIL",
                            returnStdout: true
                        ).trim()

                        if (status == "OK") {
                            echo "Frontend is up at http://${env.EC2_IP}:3000"
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

    post {
        success {
            echo "Pipeline completed. App running at http://${env.EC2_IP}:3000"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
