const prisma = require("../db");

const router = require("express").Router();

//  POST /api/books  -  Creates a new book
router.post("/", async (req, res, next) => {
  const { title, year, summary, quantity, genre, authorName } = req.body;

  const newBookData = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorName,
  };
  try {
    const newBook = await prisma.book.create({data: newBookData});
    res.status(201).json(newBook);


  } catch (error) {
    next(error);
  }

});

router.get("/", async (req, res, next) => {
  try {
    const allBooks = await prisma.book.findMany();
    res.json(allBooks);
  } catch (error) {
    next(error);
    
  }
});

router.get("/:bookId", async (req, res, next) => {
  try {
    const book = await prisma.book.findUnique({where: {id: req.params.bookId}});
    res.json(book);
  } catch (error) {
    next(error);
    
  }
});
//1:22:19 
module.exports = router;
