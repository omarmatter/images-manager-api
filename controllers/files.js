const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Folder = require("../models/folder");
const File = require("../models/file");
const Tag = require("../models/tag");
const FileTag = require("../models/fileTags");

const {response,errorResponse} = require("../helper/");
const jwt = require('jsonwebtoken');

const multer = require('multer');
const FileTags = require("../models/fileTags");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    }
    , filename: function (req, file, cb) {
        cb(null, Date.now() +'-'+ file.originalname)
    }
})
const upload = multer({
    storage: storage
})

router.post("/", upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        const folderId = req.params.id;
        const userId = req.user.userId;
        const promises = files.map(async (file) => {
              const fileCreated = await File.create({
                name: file.originalname,
                url: file.path,
                folderId: folderId,
                userId: userId,
            });
            // create a File tags here
               // check if req.body contains tags  and if it is an array and if it has at least one element
                  const {tags} = req.body;
            if(
                tags &&
                Array.isArray(req.body.tags) && req.body.tags.length) {
                // get all tags
                const tags = await Tag.findAll({
                    where: {
                        id: req.body.tags,
                        userId: req.user.userId,
                    }
                });
                if(!tags.length) {
                  // throw an error
                    throw new Error('Tags not found');
                }


        
                // create a new array of promises
                const promises = tags.map(async (tag) => {
                    // create a new FileTag
                    await  FileTag.create({
                        fileId: fileCreated.id,
                        tagId: tag.id,
                    });
                });

            
            }else{
                // return a response with error
                errorResponse(res, 'error upload', null, 404)
            }
        
        }
        );
                // wait for all promises to resolve
            
        await Promise.all(promises);
    
        response(res, 'success upload', files);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error upload', err)
    }
    }
);
// router.post("/", upload.single('file'), async (req, res) => {
//     try {
//         await File.create({
//             name: req.file.originalname,
//             url: req.file.path,
//             folderId: req.body.folderId,
//             userId: req.user.userId,
//         });

//         response(res, 'success upload', req.file);
//     } catch (err) {
//         console.log(err)
//         errorResponse(res, 'error upload', err)
//     }
//     }
// );

// Get all files of user
router.get("/", async (req, res) => {
    try {
        const files = await File.findAll({
            where: { userId: req.user.userId },
            attributes: ['id', 'name', 'url'],
             include: [
                {
                    model: Tag,
                    attributes: ['id', 'name'],
                
                },
            ],
        });
        response(res, 'success get all files', files);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error get all files', err)
    }
    }

);

// Get a file
router.get("/:id", async (req, res) => {
    try {
         const file = await File.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'url'],
        });
        response(res, 'success get file', file);
    } catch (err) {
        errorResponse(res, 'error get file', err)
    }
    }
);

// Update a file
router.put("/:id", async (req, res) => {
    try {
      const fileId = req.params.id;
      const updatedFile = await File.update(
        {
          name: req.body.name,
        },
        {
          where: { id: fileId },
        }
      );
  
      if (updatedFile[0] === 0) {
        // Throw an error if file not found
        throw new Error('File not found');
      }
  
      // Update tags if provided
      const { tags } = req.body;
      if (tags && Array.isArray(tags) && tags.length) {
        // Get all tags
        const existingTags = await Tag.findAll({
          where: {
            id: tags,
            userId: req.user.userId,
          },
        });
        if (!existingTags.length) {
          // Throw an error if tags not found
          throw new Error('Tags not found');
        }
  
        // Delete existing tags associated with the file
        await FileTag.destroy({ where: { fileId: fileId } });
  
        // Create new FileTags with updated tags
        await FileTag.bulkCreate(
          tags.map(tag => ({ fileId: fileId, tagId: tag }))
        );
      }
  
      response(res, 'Success update file', updatedFile);
    } catch (err) {
      errorResponse(res, 'Error update file', err.message);
    }
  });
  

// Delete a file
router.delete("/:id", async (req, res) => {
    try {
      const fileId = req.params.id;
  
      // Delete associations between file and tags in FileTags table
      await FileTag.destroy({ where: { fileId: fileId } });
  
      // Delete file
      const deletedFile = await File.destroy({
        where: { id: fileId },
      });
  
      if (deletedFile === 0) {
        // Throw an error if file not found
        throw new Error("File not found");
      }
  
      response(res, "Success delete file", deletedFile);
    } catch (err) {
      errorResponse(res, "Error delete file", err.message);
    }
  });
  
// move file to folder
router.put("/move/:id", async (req, res) => {
    try {
        const file = await File.update({
            folderId: req.body.folderId,
        }, {
            where: { id: req.params.id },
        });
        response(res, 'success move file', file);
    } catch (err) {
        errorResponse(res, 'error move file', err)
    }
    }

);

// Get all files of folder

router.get("/folder/:id", async (req, res) => {
    try {
        const files = await File.findAll({
            where: { folderId: req.params.id },
            attributes: ['id', 'name', 'url'],
        });
        response(res, 'success get all files', files);
    } catch (err) {
        console.log(err)
        errorResponse(res, 'error get all files', err)
    }

    }
);

// Delete all files of folder
router.delete("/folder/:id", async (req, res) => {
    try {
        const file = await File.destroy({
            where: { folderId: req.params.id },

        });
        response(res, 'success delete all files', file);
    } catch (err) {
        errorResponse(res, 'error delete all files', err)
    }
    }
)

// upload file or files to folder




module.exports = router;