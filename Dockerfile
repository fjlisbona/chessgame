FROM node:18-bullseye

# Install sudo
RUN apt-get update && apt-get install -y sudo

# Change ownership of global node_modules
RUN chown -R node:node /usr/local/lib/node_modules

# Install npm and angular globally
RUN sudo npm install -g npm@10.8.3
RUN npm install -g @angular/cli

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .
# Expose the port and start the app
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]

