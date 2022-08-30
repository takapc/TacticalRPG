module.exports = {
    name: "dice",
    description: "Random dice!",
    run: async (client, msg, args) => {
        var min = Math.ceil(1);
        var max = Math.floor(7);
        const num = Math.floor(Math.random() * (max - min) + min);
        msg.reply(String(num));
    },
};
