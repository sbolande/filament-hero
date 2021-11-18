const mongoose = require('mongoose');
const Print = require('../models/Print');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

    } catch (err) {
        process.exit(1);
    }
}

export default async (req, res) => {
    try {

        await connectDB();
        const { id } = req.query
        const { name, printer, filamentId, estPrintTime, actPrintTime, status, weight, date, notes, userId } = JSON.parse(req.body)

        console.log(req.body)


        const print = await Print.findById(id)

        if (print) {



            print.name = name
            print.printer = printer
            print.estPrintTime = estPrintTime
            print.actPrintTime = actPrintTime
            print.filamentId = filamentId
            print.notes = notes
            print.status = status
            print.weight = weight
            print.date = date
            print.userId = userId

            const updatedPrint = await print.save()
            res.status(200).json(updatedPrint)
        } else {
            res.status(404).json({ message: "Print not found 😩" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error })

    }


}