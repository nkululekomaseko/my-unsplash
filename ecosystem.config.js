module.exports = {
  apps: [
    {
      name: "my-unsplash",
      script: "node_modules/next/dist/bin/next",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
