const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE  [ADMIN]
router.post(
  "/create",
  admin,

  body("from_where")
    .isString()
    .withMessage("please enter a valid city name")
    .isLength({ min: 5 }),
  body("to_where")
    .isString()
    .withMessage("please enter a valid city name")
    .isLength({ min: 5 }),
  body("ticet_Price"),

  body("day_and_time").isLength({ min: 5 }),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 3- PREPARE Appointment OBJECT
      const appointment = {
        from_where: req.body.from_where,
        to_where: req.body.to_where,
        ticket_price: req.body.ticket_price,
        day_and_time: req.body.day_and_time,
      };

      // 4 - INSERT appointment INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into appointments set ? ", appointment);
      res.status(200).json({
        msg: "created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// UPDATE Appointment [ADMIN]
router.put(
  "/:id", // params
  admin,
  body("from_where")
    .isString()
    .withMessage("please enter a valid city name")
    .isLength({ min: 5 }),
  body("to_where")
    .isString()
    .withMessage("please enter a valid city name")
    .isLength({ min: 5 }),
  body("ticet_Price"),

  body("day_and_time").isLength({ min: 5 }),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF Appointment EXISTS OR NOT
      const appointment = await query(
        "select * from appointments where id = ?",
        [req.params.id]
      );
      if (!appointment[0]) {
        res.status(404).json({ ms: "appointment not found !" });
        return;
      }

      // 3- PREPARE MOVIE OBJECT
      const appointmentObj = {
        from_where: req.body.from_where,
        to_where: req.body.to_where,
        ticket_price: req.body.ticket_price,
        day_and_time: req.body.day_and_time,
      };

      // 4- UPDATE MOVIE
      await query("update appointments set ? where id = ?", [
        appointmentObj,
        appointment[0].id,
      ]);

      res.status(200).json({
        msg: "appointment updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE APPOINTMENT [ADMIN]
router.delete(
  "/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // 2- CHECK IF Appointment EXISTS OR NOT
      const appointment = await query(
        "select * from appointments where id = ?",
        [req.params.id]
      );
      if (!appointment[0]) {
        res.status(404).json({ ms: "appointment not found !" });
        return;
      }

      await query("delete from appointments where id = ?", [appointment[0].id]);
      res.status(200).json({
        msg: "Appointment delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// LIST & SEARCH [ADMIN, USER]
router.get("/show", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    //res.json(req.query)
    search = `where from_where LIKE '%${req.query.search}%' or to_where LIKE '%${req.query.search}%'`;
  }
  const appointments = await query(`select * from appointments ${search}`);

  res.status(200).json(appointments);
});

// SHOW Appointment [ADMIN, USER]
router.get("/getone/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const appointment = await query("select * from appointments where id = ?", [
    req.params.id,
  ]);
  if (!appointment[0]) {
    res.status(404).json({ ms: "appointment not found !" });
  }
  res.status(200).json(appointment[0]);
});

//SHOW ALL
router.get("/all", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const appointment = await query("select * from appointments");
  if (!appointment[0]) {
    res.status(404).json({ ms: "appointment not found !" });
  }
  res.status(200).json(appointment);
});

module.exports = router;
