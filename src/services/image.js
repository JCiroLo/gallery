export default {
  async get() {
    try {
      const response = await (
        await fetch(
          `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/info`
        )
      ).json();

      return response;
    } catch (error) {
      return null;
    }
  },
};
