export default function (app) {
    app.use('/api/v1/user', require('../../api/v1/user'));
    app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('views')}/404.html`));
    });
    console.log(`All Routes Registered`);
}