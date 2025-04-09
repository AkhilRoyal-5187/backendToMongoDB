import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
let app = express();
app.use(express.json());
let port = process.env.PORT || 4000; 

let connectString = process.env.DB_STRING

app.listen(port, ()=>{
    console.log(`The server is Running at the port ${port}`);
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
  });
  
const User = mongoose.model('User', userSchema);



async function mongodb(){
    
   let data = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
}

mongodb();



app.post('/api/users', async (req, res) => {

    const user = new User({

          name: req.body.name,
          email: req.body.email
    });
  
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });  

app.get('/api/students', async(req,res)=>{
    
       try {
        const users = await User.find();
        res.status(200).json(users);
       } catch (error) {
        console.log("failed to connect the server due to " ,error);
        res.status(500).json(error);
       }
      
      
});

app.get('/api/students/:id', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Student not found' });
          }
          res.json(user);
        } catch (error) {
        console.log("There is an error running the code ", error);
    }
})


app.put('/api/students/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.delete('/api/students/:id', async (req, res) => {
    try {
        const deletedStudent = await User.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  



app.post('/chat', (req,res)=>{
    console.log(req.body);
})