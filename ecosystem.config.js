module.exports = {
  apps: [
    {
      name: "image-uploader",
      watch: false,
      force: true,
      env: {
        PORT: 4000,
        NODE_ENV: "production",
      },
    },
  ],
};
