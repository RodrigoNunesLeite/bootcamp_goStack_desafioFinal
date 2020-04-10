import File from '../models/Files';

class FileController {
  // Salva os dados do arquivo no banco de dados
  async store(req, res) {
    /**
     * originalName = nome do arquivo da máquina do usuário
     */
    const { originalname: name, filename: path } = req.file;
    console.log(req.file);
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
