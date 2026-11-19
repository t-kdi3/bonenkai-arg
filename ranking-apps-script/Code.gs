function doGet() {
  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheets()[0];

  const values =
    sheet.getDataRange().getValues();

  const ranking = [];

  for (let i = 1; i < values.length; i++) {
    const name = values[i][1];
    const time = Number(values[i][2]);

    if (name && !isNaN(time)) {
      ranking.push({
        name: name,
        time: time
      });
    }
  }

  ranking.sort(
    (a, b) => a.time - b.time
  );

  return ContentService
    .createTextOutput(
      JSON.stringify(ranking)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};

  if (params.action !== "reset") {
    return jsonOutput({
      success: false,
      message: "要求された操作はサポートされていません。"
    });
  }

  const configuredToken =
    PropertiesService
      .getScriptProperties()
      .getProperty("RANKING_RESET_TOKEN");
  const suppliedToken = String(params.token || "");

  if (!configuredToken || configuredToken.length < 32) {
    return jsonOutput({
      success: false,
      message: "リセット認証キーが未設定です。企画者がApps Scriptのスクリプト プロパティに32文字以上のキーを設定してください。"
    });
  }

  if (suppliedToken !== configuredToken) {
    return jsonOutput({
      success: false,
      message: "リセット認証キーが正しくありません。"
    });
  }

  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheets()[0];
  const lastRow = sheet.getLastRow();
  const deletedRows = Math.max(lastRow - 1, 0);

  if (deletedRows > 0) {
    sheet
      .getRange(2, 1, deletedRows, sheet.getLastColumn())
      .clearContent();
  }

  return jsonOutput({
    success: true,
    deletedRows: deletedRows
  });
}

function jsonOutput(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
