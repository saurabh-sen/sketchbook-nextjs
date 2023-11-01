# Stage 1: Build the Next.js application
FROM node:20 as builder

WORKDIR /sketchbookBuild

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code and build it
COPY . .
RUN yarn build

# Stage 2: Create a smaller image for running the application
FROM node:20 as runner

WORKDIR /sketchbook

# Copy the package.json and yarn.lock from the builder stage
COPY --from=builder /sketchbookBuild/package.json package.json
COPY --from=builder /sketchbookBuild/yarn.lock yarn.lock

# Install production dependencies only
RUN yarn install

# Copy the built application from the builder stage
COPY --from=builder /sketchbookBuild/.next ./.next
COPY --from=builder /sketchbookBuild/public ./public
COPY --from=builder /sketchbookBuild/next.config.js ./next.config.js

# Expose the port your Next.js application will run on (default is 3000)
EXPOSE 3000

# Start your Next.js application
CMD ["yarn", "start"]
