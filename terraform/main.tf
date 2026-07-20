module "vpc" {
  source = "./modules/vpc"

  cluster_name         = var.project_name
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  tags                 = local.common_tags
}

module "ec2" {
  source = "./modules/ec2"

  name                = var.project_name
  vpc_id              = module.vpc.vpc_id
  subnet_id           = module.vpc.public_subnet_ids[0]
  instance_type       = var.instance_type
  ami_id              = var.ami_id
  associate_public_ip = true
  root_volume_size    = var.root_volume_size
  public_key          = var.public_key
  ssh_allowed_cidrs   = var.ssh_allowed_cidrs
  tags                = local.common_tags
}
