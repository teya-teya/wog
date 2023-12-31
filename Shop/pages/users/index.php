<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
      integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn"
      crossorigin="anonymous"
    />
    <title>Личный кабинет</title>
    <style>
      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link {
        background-color: cornflowerblue;
      }
    </style>
  </head>
  <body>
    <div class="container mt-5">
      <div class="row">
        <div class="col-3">
          <div
            class="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link"
              id="profileTab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
              >Профиль</a
            >
            <a
              class="nav-link"
              id="messagesTab"
              data-toggle="pill"
              href="#v-pills-messages"
              role="tab"
              aria-controls="v-pills-messages"
              aria-selected="false"
              >Сообщения</a
            >
            <a
              class="nav-link"
              id="settingsTab"
              data-toggle="pill"
              href="#v-pills-settings"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected="false"
              >Настройки</a
            >
          </div>
        </div>
        <div class="col-9">
          <div class="tab-content" id="v-pills-tabContent">
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <div class="row">
                <div class="col-sm-4">
                  <img
                    src="https://chess-center.ru/wp-content/uploads/2022/09/2_4yls8wlami9frintdrgsya.jpeg"
                    alt=""
                    width="100%"
                  />
                </div>
                <div class="col-sm-8">
                  <h2><?php echo $_SESSION["name"]; ?> <?php echo $_SESSION["lastname"]; ?></h2>
                  <h3>Id: <span><?= $_SESSION["id"]; ?></span></h3>
                  <p>Email: <span><?php echo $_SESSION["email"]; ?></span></p>
                  <h3>О себе рассказывает</h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Atque fuga non veritatis minus. Accusamus rerum officia
                    voluptas, non impedit laudantium placeat ex quaerat iste
                    provident quas eum ab beatae. Doloremque.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              Страница сообщений
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-settings"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab"
            >
              Страница настроек
            </div>
          </div>
        </div>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF"
      crossorigin="anonymous"
    ></script>
    <script>
      let pathname = location.pathname.split("/")[2];
      let navLinks = document.querySelectorAll(".nav-link");

      addEventListener("popstate", (event) => {
        let pathPop = location.pathname.split("/")[2];
        if (pathPop == "profile") {
          $("#profileTab").tab("show");
        } else if (pathPop == "messages") {
          $("#messagesTab").tab("show");
        } else if (pathPop == "settings") {
          $("#settingsTab").tab("show");
        }
      });

      if (pathname == "profile") {
        $("#v-pills-profile").tab("show");
      } else if (pathname == "messages") {
        $("#v-pills-messages").tab("show");
      } else if (pathname == "settings") {
        $("#v-pills-settings").tab("show");
      } else {
        location.href = location.protocol + "//" + location.host;
      }

      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", () => {
          let page = navLinks[i]
            .getAttribute("aria-controls")
            .split("v-pills-")[1];
          console.log(page);
          history.pushState("", "", page);
        });
      }
      document.getElementById(pathname + "Tab").classList.add("active");
    </script>
  </body>
</html>
