const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const path = require('path');


//Router configuration
const categoryRouter = require('./routes/category');
const servicesRouter = require('./routes/services');
const clientRouter = require('./routes/client');
const eventRouter = require('./routes/event');
const userRouter = require('./routes/user');
const userReportRouter = require('./routes/userReports');
const clientReportRouter = require('./routes/clientsReports');
const transactionReportRouter = require('./routes/transactionReport');
const eventReportRouter = require('./routes/eventRoute');
const transactionRouter = require('./routes/transaction');




// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



// Routes
// app.use('/', (req, res) => {
//     res.send("Hello World")
// })

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/categories", categoryRouter);
app.use("/services", servicesRouter);
app.use("/clients", clientRouter);
app.use("/events", eventRouter);
app.use("/users", userRouter);
app.use("/transaction", transactionRouter);
// Reports
app.use("/reports", userReportRouter);
app.use("/reports", clientReportRouter);
app.use("/reports", eventReportRouter);
app.use("/reports", transactionReportRouter);


// Mongoose setup
const PORT = process.env.PORT   || 8000
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); 
    })
   .catch(err => {
        console.log("Error connecting to MongoDB", err)
    })