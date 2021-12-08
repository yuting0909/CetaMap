# CetaMap 鯨視 | 鯨豚生態視覺化平台
## 規格與使用技術
- 後端：Node.js / Express，使用 MVC 架構開發
- 前端：connect-flash、express-handlebars、Bootstrap5
- 資料庫：MySQL，透過 Sequelize 語法操作資料庫
- 載入外部資料 (JSON 格式)，重新梳理格式
- 透過 Passport.js、express-session 實作登入驗證功能
- 使用 Webpack 打包、模組化前端相關檔案
- 使用第三方地圖套件 Leaflet.js 開發地理資訊平台
- 使用 D3.js 進行資料視覺化，開發互動式圖表
- 使用 Heroku 部署，部署資料庫為 ClearDB

## 功能介紹 (user story)
### 身為一般使用者
- 我可以瀏覽臺灣海域鯨豚的分布狀況
- 我可以瀏覽鯨豚生態視覺化圖表
- 我可以上傳鯨豚目擊紀錄 (尚未開放)

### 身為生態調查公司
- 我可以上傳鯨豚生態調查資料 (尚未開放)
- 我可以下載鯨豚生態調查資料 (尚未開放)

### 身為管理者
- 我可以在後台審核鯨豚生態調查與公民目擊資料 (尚未開放)
- 我可以在後台上傳鯨豚生態調查與公民目擊資料 (尚未開放)

## 使用說明
- 需登入才能操作介面
- 測試帳號
  - 帳號：test@test.test
  - 密碼：test
- 地理資訊圖台
  - 左側為鯨豚觀測紀錄列表，可以依照物種篩選觀測紀錄
  - 右側地圖顯示觀測紀錄的經緯度或模糊化分布，可由左側選單進行切換
  - 點選左側特定的觀測紀錄或地圖上的圖標，會彈出小視窗，顯示該筆紀錄的詳細資料
- 資料
  - 瀏覽所有的鯨豚觀測紀錄，點選特定觀測紀錄可以進入詳細資訊頁面
  - 可以輸入物種名稱搜尋觀測紀錄
- 視覺化
  - 統計物種組成、並以圓餅圖呈現各物種組成比例
  - 時間分布圖可依據勾選的物種作呈現
