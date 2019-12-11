<template>
  <div id="app">
    <div class="logo">
      <h1>AdFox 🎯</h1>
    </div>
    <el-input size="large" v-model="aimUrl">
      <template slot="prepend">Aim Adfox URL</template>
    </el-input>
    <el-input size="large" @focus="this.copyResult" readonly v-model="inliner">
      <template slot="prepend">Result</template>
    </el-input>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Инструкция</span>
      </div>
      <ol>
        <li v-for="o in steps" :key="o" class="text item">
          {{ o }}
        </li>
      </ol>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      aimUrl: "",
      inliner: "",
      regExp: /bindObject\?p=(.*)$/,
      steps: [
        'В интерфейсе AdFox нажимаем "Прицелиться" на нужный баннер',
        "Копируем ссылку из попапа",
        "Вставляем в верхнее поле",
        "Автоматически появится результат в нижнем поле и сразу будет скопирован",
        "Открываем страницу на Маркете, где хотим прицелиться (лучше в ЯБро)",
        "Вставляем в адресную строку результат и нажимаем Enter",
        "???????",
        "PROFIT!!!"
      ]
    };
  },
  watch: {
    aimUrl(newVal) {
      const match = this.regExp.exec(newVal);

      if (match && match[1]) {
        this.$metrika.reachGoal("transpiled");

        this.inliner = `javascript:(function(){var date = new Date(); date.setTime(date.getTime() + 15 * 60 * 1000); var expires = "; expires=" + date.toUTCString(); document.cookie = "bindobj=${match[1]}" + expires + "; path=/"; window.location = window.location;})();`;
        this.copyResult();
      } else {
        this.inliner = "";
      }
    }
  },
  methods: {
    copyResult() {
      this.$copyText(this.inliner).then(
        () => {
          this.$metrika.reachGoal("copied");
          this.$notify({
            title: "Copied!",
            message: "Go and paste result in adress bar",
            type: "success"
          });
        },
        () => {
          this.$metrika.reachGoal("not-copied");
          this.$notify({
            title: "Error",
            message: "Something went wrong",
            type: "error"
          });
        }
      );
    }
  }
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  padding: 40px;
}

.logo {
  text-align: center;
}

.el-input {
  margin: 40px 0;
}
</style>
