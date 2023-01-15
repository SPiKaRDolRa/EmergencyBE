const { Router } = require("express");
const db = require("../db");
const path = require("path");
const mime = require("mime");
const xl = require("excel4node");

const router = Router();

const createExcel = () => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("ข้อมูลปัญหาบนท้องถนน");
  let queryAllMarks = "SELECT * FROM traffic_problem_report";

  db.query(queryAllMarks, (err, result) => {
    if (err) {
      console.log(err.stack);
      return err;
    }

    const headerColumns = [
      "ลำดับ",
      "ประเภทปัญหา",
      "ประเภทอื่นๆ",
      "รูปภาพ",
      "ละติจูต",
      "ลองจิจูด",
      "สร้างเมื่อ",
    ];

    const data = result.rows;

    let colIndex = 1;
    headerColumns.forEach((header) => {
      ws.cell(1, colIndex++).string(header);
    });

    let rowIndex = 2;
    data.forEach((item) => {
      Object.keys(item).forEach(() => {
        ws.cell(rowIndex, 1).number(item["id"]);

        ws.cell(rowIndex, 2).string(item["problem_category"]);

        ws.cell(rowIndex, 3).string(item["other_info"]);

        ws.cell(rowIndex, 4).string(item["img"]);

        ws.cell(rowIndex, 5).number(item["lnt"]);

        ws.cell(rowIndex, 6).number(item["lng"]);

        ws.cell(rowIndex, 7).date(item["create_at"]).style({
          numberFormat: "yyyy-mm-dd hh:mm:ss",
        });
      });
      rowIndex++;
    });
    wb.write("Traffic-problem-reports.xlsx");
  });
};

router.get("/", (req, res) => {
  createExcel();
  const file = __dirname.slice(0, -6) + "Traffic-problem-reports.xlsx";
  const fileName = path.basename(file);
  const mimeType = mime.getType(file);

  res.setHeader("Contect-Disposition", "attachment;filename=" + fileName);
  res.setHeader("Content-Type", mimeType);

  setTimeout(() => {
    res.download(file);
  }, 2000);
});

module.exports = router;
