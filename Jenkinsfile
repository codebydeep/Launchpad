pipeline{
    agent any;
    stages{
        stage("Code"){
            steps{
                git url: "https://github.com/codebydeep/Launchpad.git", branch: "main"
            }
        }
        stage("Build"){
            steps{
                sh "docker build -t app-frontend ./client"
                sh "docker build -t app-backend ./server"
            }
        }
        stage("Test"){
            steps{
                echo "Code test ho gaya"
            }
        }
        stage("Push to Docker Hub"){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: "dockerCredentialsID",
                    usernameVariable: "dockerHubUser",
                    passwordVariable: "dockerHubPass",
                    )]){
                    sh "docker image tag app-frontend ${env.dockerHubUser}/app-frontend:latest"
                    sh "docker image tag app-backend ${env.dockerHubUser}/app-backend:latest"
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker push ${env.dockerHubUser}/app-frontend:latest"
                    sh "docker push ${env.dockerHubUser}/app-backend:latest"
                }
            }
        }
        stage("Deploy"){
            steps{
                sh "docker compose up -d --build"
            }
        }
    }
}
