# 🚀 Deployment Guide - Tebak Kecap Sunda

This guide covers multiple deployment strategies for the Tebak Kecap Sunda game on your VPS.

---

## 📋 Prerequisites

- VPS with Docker installed (Ubuntu 20.04+ recommended)
- Domain name (optional, but recommended)
- SSH access to your VPS
- Basic knowledge of Linux commands

---

## 🐳 Option 1: Docker Deployment (Recommended)

### Step 1: Prepare Your VPS

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Transfer Project to VPS

**Option A: Using Git (Recommended)**
```bash
# On your VPS
cd /var/www
sudo git clone <your-repository-url> tebak-kecap-sunda
cd tebak-kecap-sunda
```

**Option B: Using SCP**
```bash
# From your local machine
scp -r ./tebak-kecap-react user@your-vps-ip:/var/www/tebak-kecap-sunda
```

### Step 3: Build and Run with Docker Compose

```bash
# Navigate to project directory
cd /var/www/tebak-kecap-sunda

# Build and start the container
sudo docker-compose up -d

# Check logs
sudo docker-compose logs -f

# Verify container is running
sudo docker ps
```

### Step 4: Configure Firewall

```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp

# Allow HTTPS traffic (if using SSL)
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

### Step 5: Access Your Game

Visit `http://your-vps-ip:8080` in your browser.

---

## 🔒 Option 2: With SSL/HTTPS (Production)

### Prerequisites
- Domain name pointing to your VPS IP
- Certbot installed

### Step 1: Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Update nginx.conf

Edit `nginx.conf` to include your domain:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # ... rest of configuration
}
```

### Step 3: Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 4: Update docker-compose.yml for SSL

```yaml
services:
  tebak-kecap-sunda:
    # ... existing config
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - /etc/letsencrypt:/etc/letsencrypt:ro
```

### Step 5: Restart Container

```bash
sudo docker-compose down
sudo docker-compose up -d
```

---

## 🎯 Option 3: Behind Reverse Proxy (Nginx on Host)

If you're running multiple applications on your VPS:

### Step 1: Install Nginx on Host

```bash
sudo apt install nginx -y
```

### Step 2: Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/tebak-kecap-sunda
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 3: Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/tebak-kecap-sunda /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔧 Docker Management Commands

### View Logs
```bash
# Real-time logs
sudo docker-compose logs -f

# Last 100 lines
sudo docker-compose logs --tail=100
```

### Restart Application
```bash
sudo docker-compose restart
```

### Stop Application
```bash
sudo docker-compose down
```

### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
sudo docker-compose up -d --build
```

### Remove Everything (Clean Slate)
```bash
sudo docker-compose down -v
sudo docker system prune -a
```

---

## 📊 Monitoring & Maintenance

### Check Container Health
```bash
sudo docker ps
sudo docker stats
```

### View Resource Usage
```bash
# CPU and Memory
sudo docker stats tebak-kecap-sunda

# Disk usage
sudo du -sh /var/www/tebak-kecap-sunda
```

### Auto-restart on Boot
The `restart: unless-stopped` policy in `docker-compose.yml` ensures the container automatically starts on system reboot.

---

## 🐛 Troubleshooting

### Container Won't Start
```bash
# Check logs
sudo docker-compose logs

# Check if port is already in use
sudo netstat -tuln | grep 8080
```

### Permission Issues
```bash
# Give Docker permissions
sudo chmod -R 755 /var/www/tebak-kecap-sunda
```

### Out of Disk Space
```bash
# Clean up Docker resources
sudo docker system prune -a
```

### Application Not Accessible
```bash
# Check firewall
sudo ufw status

# Check if container is running
sudo docker ps

# Check nginx logs (if using reverse proxy)
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/tebak-kecap-sunda
            git pull origin main
            sudo docker-compose up -d --build
```

---

## 📈 Performance Optimization

### Enable Gzip Compression
Already configured in `nginx.conf`

### Browser Caching
Static assets cached for 1 year (configured in nginx.conf)

### Docker Resource Limits

Update `docker-compose.yml`:

```yaml
services:
  tebak-kecap-sunda:
    # ... existing config
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

---

## 🔐 Security Best Practices

1. **Keep Docker Updated**
   ```bash
   sudo apt update && sudo apt upgrade docker-ce docker-ce-cli containerd.io
   ```

2. **Use Firewall**
   ```bash
   sudo ufw enable
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   ```

3. **Regular Backups**
   ```bash
   # Backup project directory
   sudo tar -czf tebak-kecap-backup-$(date +%Y%m%d).tar.gz /var/www/tebak-kecap-sunda
   ```

4. **Monitor Logs**
   ```bash
   sudo docker-compose logs -f | grep -i error
   ```

---

## 📞 Support

For deployment issues:
1. Check container logs: `sudo docker-compose logs -f`
2. Verify Docker is running: `sudo systemctl status docker`
3. Check firewall rules: `sudo ufw status`
4. Test nginx config: `sudo nginx -t`

---

**Happy Deploying!** 🎉
