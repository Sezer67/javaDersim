const Test = require("../models/Test");

exports.createTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res
      .status(200)
      .json({ status: "success", message: "Test oluşturuldu", test });
  } catch (err) {
    res.status(400).json({ status: "error", message: err });
  }
};

exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().select('-question -answer -options');
    res
      .status(200)
      .json({ status: "success", message: "Veriler Alındı", tests });
  } catch (err) {
    res.status(400).json({ status: "error", message: err });
  }
};

exports.getTestById = async (req,res) => {
    try {
        const test = await Test.findById(req.params.id);
        res
          .status(200)
          .json({ status: "success", message: "İşlem Başarılı", test })
      } catch (err) {
        res.status(400).json({ status: "error", message: "Girilen ID değeri ile herhangi bir test eşleşmiyor" });
      }
}

exports.nextTestByNo = async (req,res) => {
  const no = Number(req.params.no) + 1;
  const nextTest = await Test.findOne({no});
  console.log(nextTest);
  if(nextTest){
    res.status(200).json({status:"success",message:"Veriler Alındı",test:nextTest});
  }else{
    res.status(404).json({status:"error",message:"Bir Sonraki Test Bulunamadı"});
  }
}

exports.updateTest = async (req, res) => {};
