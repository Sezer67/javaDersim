const Notes = require("../models/Notes");

exports.createNote = async (req, res) => {
  //body objects => userId , title , body
  try {
    const note = await Notes.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Notunuz Başarıyla Oluşturuldu",
      note,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Eksik Parametre",error });
  }
};

//bir kullanıcının notları by id
exports.getAllNotes = async (req, res) => {
  // query => title, date alıncak asc , desc sıralama
  //hangi id ye ait kullanıcının notları gelecek
  const { userId } = req.params;

  try {
    const notes = await Notes.find({ userId }).sort("-updatedDate");
    res.status(200).json({
      status: "success",
      message: "Notlar Başarıyla Çekildi",
      notes,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: "Notlar Bulunamadı", error });
  }
};

exports.updateNoteById = async (req, res) => {
  //params =>  / noteId
  const { id } = req.params;
  const {body,title} = req.body;

  try{
    const note = await Notes.findById(id);
    note.body = body ? body : note.body;
    note.title = title ? title : note.title;
    note.updatedDate = Date(Date.now);
    await note.save();
    res.status(200).json({status:"success",message:"Güncelleme Başarılı",note});
  }catch(error){
    res
      .status(400)
      .json({ status: "error", message: "Not Bulunamadı", error });
  }

};

exports.deleteNoteById = async (req,res) => {
  const { id } = req.params;
  try{
    await Notes.findByIdAndRemove(id);
    res.status(204).json({status:"success"});
  }catch(error){
    res
      .status(400)
      .json({ status: "error", message: "Not Bulunamadı", error });
  }
}
