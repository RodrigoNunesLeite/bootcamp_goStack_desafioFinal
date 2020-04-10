import Signature from '../models/Signatures';

class SignatureController {
  // Salva os dados do arquivo no banco de dados
  async store(req, res) {
    /**
     * originalName = nome do arquivo da máquina do usuário
     */
    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.create({
      name,
      path,
    });

    return res.json(signature);
  }
}

export default new SignatureController();
