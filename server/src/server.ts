import app from './app';

const PORT = process.env.PORT || 4000;

export const startServer = () => {
  return app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };