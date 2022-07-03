const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { username, password, university } = req.body;
  console.log(req.body);
  const findUser = await User.findOne({ username });
  if (findUser)
    res
      .status(400)
      .json({ status: "error", message: "Bu kullanıcı zaten mevcut" });
  else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err)
          return res
            .status(400)
            .json({ status: "error", message: "Beklenmeyen Bir Hata Oluştu" });
        const user = await User.create({
          username,
          password: hash,
          university,
        });
        delete user.password;
        res
          .status(201)
          .json({
            status: "success",
            message: "Hesabınız Oluşturuldu",
            user: user,
          });
      });
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    res.status(404).json({ status: "error", message: "Kullanıcı Bulunamadı" });
  else {
    //password doğrula
    bcrypt.compare(password, user.password, (err, result) => {
      if (result)
        res
          .status(200)
          .json({ status: "success", message: "Giriş Başarılı", user: user });
      else res.status(400).json({ status: "error", message: "Şifre Yanlış" });
    });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { lessonId, completedTestId, wrongTestId } = req.body;
  console.log(req.body);
  //lesson için
  /*body : {
        completedLesson:lesson id,
        completedTest:test id,
        wrongTest: test id
    }*/
  try {
    const user = await User.findById(id);
    if (lessonId) await user.completedLesson.push(lessonId);
    if (completedTestId) {
      await user.completedTest.push(completedTestId);
      //eğer o id ye ait bir test yanlış yağılmışsa o listeden kaldırılsın
      const filtered = await user.wrongTest.filter(id=>id.toString() !== completedTestId);
      console.log(filtered);
      user.wrongTest = filtered;
    }
    if (wrongTestId) await user.wrongTest.push(wrongTestId);
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Güncelleme Başarılı", user });
  } catch (err) {
    res.status(400).json({ status: "error", message: err });
  }
};

exports.getUserById = async (req,res) =>{
  const {id} = req.params;
  const user = await User.findById(id);
  if(!user)
    res.status(404).json({status:"error",message:"Kullanıcı Bulunamadı"});
  res.status(200).json({status:"success",message:"Kullanıcı Bulundu",user});
}

//tamamlanmış dersler
//tamamlanmış testler