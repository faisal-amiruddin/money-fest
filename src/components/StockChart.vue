<template>
  <div id="tradingview_chart" style="height: 500px;"></div>
</template>

<script>
export default {
  name: "StockChart",
  mounted() {
    new TradingView.widget({
      container_id: "tradingview_chart",
      width: "100%",
      height: 500,
      symbol: "IDX:CDIA", // kalau saham Indonesia → pakai prefix IDX:
      interval: "D",
      timezone: "Asia/Jakarta",
      theme: "dark",
      style: "1",
      locale: "id",
      toolbar_bg: "#1f2937",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      allow_symbol_change: true
    });
  }
};
</script>

<style scoped>
#tradingview_chart {
  border-radius: 10px;
}
</style>
