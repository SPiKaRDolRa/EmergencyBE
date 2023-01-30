const { Router } = require("express");
const db = require("../db");
const path = require("path");
const mime = require("mime");
const xl = require("excel4node");

const router = Router();

const createExcel = () => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("ข้อมุลอุบัติเหตุ");
  let queryAllMarks = "SELECT * FROM emergency_report";

  function correctTimezoneIssue(jsDate) {
    return new Date(jsDate.getTime() + jsDate.getTimezoneOffset() * -1 * 60000);
  }

  db.query(queryAllMarks, (err, result) => {
    if (err) {
      console.log(err.stack);
      return err;
    }

    const headerColumns = [
      "ลำดับ",
      "ยานพาหนะ",
      "คู่กรณี",
      "ยานพาหนะคู่กรณี",
      "ลักษณะอุบัติเหตุ",
      "ลักษณะอื่นๆ",
      "มูลเหตุสันนิษฐาน",
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

        ws.cell(rowIndex, 2).string(item["victim_vehicle"]);

        ws.cell(rowIndex, 3).bool(item["has_parties"]);

        ws.cell(rowIndex, 4).string(item["party_vehicle"]);

        ws.cell(rowIndex, 5).string(item["accident_info"]);

        ws.cell(rowIndex, 6).string(item["other_info"]);

        ws.cell(rowIndex, 7).string(item["assumption"]);

        ws.cell(rowIndex, 8).string(item["img"]);

        ws.cell(rowIndex, 9).number(item["lnt"]);

        ws.cell(rowIndex, 10).number(item["lng"]);

        ws.cell(rowIndex, 11)
          .date(correctTimezoneIssue(new Date(item["create_at"])))
          .style({
            numberFormat: "yyyy-mm-dd hh:mm:ss",
          });
      });
      rowIndex++;
    });
    wb.write("Emergency-reports.xlsx");
  });
};

router.get("/", (req, res) => {
  createExcel();
  const file = __dirname.slice(0, -6) + "Emergency-reports.xlsx";
  const fileName = path.basename(file);
  const mimeType = mime.getType(file);

  res.setHeader("Contect-Disposition", "attachment;filename=" + fileName);
  res.setHeader("Content-Type", mimeType);

  setTimeout(() => {
    res.download(file);
  }, 2000);
});

module.exports = router;
