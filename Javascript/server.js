const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.set("trust proxy", true);

// DATABASE
const db = new sqlite3.Database("database.db");

db.run(`
CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    page TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// ĐẾM + TRẢ SỐ HÔM NAY
app.get("/count", (req, res) => {

    const ip = req.ip;
    const page = "gioithieu.html";

    db.get(
        `SELECT time FROM visits
         WHERE ip=? AND page=?
         ORDER BY time DESC
         LIMIT 1`,
        [ip, page],
        (err, row) => {

            let allow = true;

            if (row) {
                const last = new Date(row.time).getTime();
                if (Date.now() - last < 600000) {
                    allow = false;
                }
            }

            if (allow) {
                db.run(
                    "INSERT INTO visits(ip,page) VALUES(?,?)",
                    [ip,page]
                );
                console.log("✔ counted:", ip);
            } else {
                console.log("⛔ skip:", ip);
            }

            // trả số hôm nay
            db.get(`
                SELECT COUNT(*) as total
                FROM visits
                WHERE page=?
                AND date(time)=date('now')
            `,[page], (e,r)=>{
                res.json({ today: r.total });
            });

        }
    );
});


// stats tổng
app.get("/stats-all", (req,res)=>{
    db.get(`
        SELECT COUNT(*) as total
        FROM visits
        WHERE page='gioithieu.html'
    `,(e,r)=>{
        res.json({ total:r.total });
    });
});

app.listen(PORT, ()=>{
    console.log("Server chạy http://localhost:"+PORT);
});
