const Lesson = require("../models/Lesson");

exports.createLesson = async (req, res) => {
  const control = await Lesson.findOne({ name: req.body.name });
  if (control) {
    res
      .status(400)
      .json({ status: "error", message: "Bu isimde bir ders kayıtlı" });
  } else {
    try {
      const lesson = await Lesson.create(req.body);
      res.status(201).json({
        status: "success",
        message: "Ders Başarıyla OLuşturuldu",
        lesson,
      });
    } catch (err) {
      res.status(400).json({ status: "error", message: err });
    }
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({}).select("-body -testID");
    res
      .status(200)
      .json({ status: "success", message: "Veriler Alındı", lessons });
  } catch (err) {
    res.status(400).json({ status: "error", message: err });
  }
};

exports.getLessonById = async (req, res) => {
  //parametreden alacak değeri
  try {
    const lesson = await Lesson.findById(req.params.id);
    res
      .status(200)
      .json({ status: "success", message: "İşlem Başarılı", lesson });
  } catch (err) {
    res
      .status(400)
      .json({
        status: "error",
        message: "Girilen ID değeri ile herhangi bir ders eşleşmiyor",
      });
  }
};

exports.updateLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  const control = await lesson.testID.find((id) => id.toString() === req.body.testId);
  
  if (control)
    return res.status(400).json({ status: "error", message: "Bu test zaten ekli." });
    
  lesson.testID.push(req.body.testId);
  await lesson.save();

    res
      .status(200)
      .json({ status: "success", message: "Güncelleme Başarılı", lesson });

};
