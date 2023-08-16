import mongoose from 'mongoose'

mongoose.connect("mongodb://0.0.0.0/fundsocialdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error))