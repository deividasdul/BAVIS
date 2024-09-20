import pool from "../db/db.js";

// Get all dormitories
const getDorms = async (_, res) => {
  try {
    const result = await pool.query(`SELECT * FROM dormitory ORDER BY id ASC`);
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDormitoryRooms = async (req, res) => {
  const { id } = req.params;

  try {
    const roomsList = await pool.query(
      `SELECT * FROM room INNER JOIN dormitory ON room.id = dormitory.id WHERE room.id = ($1) ORDER BY room.id ASC`,
      [id]
    );
    console.log(roomsList.rows);
    res.status(200).json(roomsList.rows);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getDorms, getDormitoryRooms };
