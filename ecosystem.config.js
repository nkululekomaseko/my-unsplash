module.exports = {
  apps: [
    {
      name: "my-unsplash",
      script: "node_modules/next/dist/bin/next -p 4000",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
