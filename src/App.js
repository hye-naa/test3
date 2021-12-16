import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { func } from "prop-types";

function App() {

  document.addEventListener("DOMContentLoaded", dataLoad);
  document.addEventListener("DOMContentLoaded", Reset);

  
      function dataLoad() {
        var pageNum = 1;

        $("#search").click(function () {
          $(window).ajaxStart(function () {
            $(".box").html("로딩 중...");
          });

          $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book",
            data: {
              query: $("#query").val(),
              page: pageNum,
              size: 10,
              target: "title"
            },
            headers: {
              Authorization: "KakaoAK 85c9d1585cccbab30f9925d3a0fc2f1d"
            }
          })
            .done(function (msg) {
              if (msg.documents.length === 0) {
                $(".box").html("검색 결과가 없습니다.");
              } else {
                for (var i = 0; i < 10; i++) {
                  if (msg.documents[i].thumbnail !== "") {
                    $(".container").append(
                      "<img src='" + msg.documents[i].thumbnail + "'/><br>"
                    );
                  } else
                    $(".container").append(
                      "<img id='noimage' src='no-picture.jpg' /><br>"
                    );
                  $(".container").append(
                    "<p><a href='" +
                      msg.documents[i].url +
                      "'>" +
                      msg.documents[i].title +
                      "</a></p>"
                  );
                  $(".container").append(msg.documents[i].authors + "<br>");
                  $(".container").append(msg.documents[i].publisher + "<br>");
                  $(".container").append(
                    msg.documents[i].datetime.slice(0, 10) + "<br>"
                  );
                  if (msg.documents[i].status === "정상판매") {
                    $(".container").append(
                      "<strong>₩ " +
                        msg.documents[i].sale_price +
                        "</strong><br>"
                    );
                  } else
                    $(".container").append(
                      "<strong>₩ " + msg.documents[i].price + "</strong><br>"
                    );
                }
              }
            })
            .fail(function () {
              $(".box").html("에러 발생");
            });
        });

        $(window).scroll(function () {
          if (
            Math.ceil($(window).scrollTop()) + $(window).height() >=
            $(document).height()
          ) {
            pageNum++;

            $(window).ajaxStart(function () {
              $(".box").html("로딩 중...");
            });

            var xhr = $.ajax({
              method: "GET",
              url: "https://dapi.kakao.com/v3/search/book",
              data: {
                query: $("#query").val(),
                page: pageNum,
                size: 10,
                target: "title"
              },
              headers: {
                Authorization: "KakaoAK 85c9d1585cccbab30f9925d3a0fc2f1d"
              }
            })
              xhr.done(function (msg) {
                for (var i = 0; i < msg.documents.length; i++) {
                  if (msg.documents[i].thumbnail !== "") {
                    $(".container").append(
                      "<img src='" + msg.documents[i].thumbnail + "'/><br>"
                    );
                  } else
                    $(".container").append(
                      "<img id='noimage' src='no-picture.jpg' /><br>"
                    );
                  $(".container").append(
                    "<p><a href='" +
                      msg.documents[i].url +
                      "'>" +
                      msg.documents[i].title +
                      "</a></p>"
                  );
                  $(".container").append(msg.documents[i].authors + "<br>");
                  $(".container").append(msg.documents[i].publisher + "<br>");
                  $(".container").append(
                    msg.documents[i].datetime.slice(0, 10) + "<br>"
                  );
                  if (msg.documents[i].status === "정상판매") {
                    $(".container").append(
                      "<strong>₩ " +
                        msg.documents[i].sale_price +
                        "</strong><br>"
                    );
                  } else
                    $(".container").append(
                      "<strong>₩ " + msg.documents[i].price + "</strong><br>"
                    );
                  if (msg.documents.length < 10) {
                    xhr.abort()
                  }
                }
              })
              .fail(function () {
                $(".box").html("에러 발생");
              });
          }
        });
      }

      function Reset() {
        $("#reset").click(function () {
          $(".inputtitle").val("");
  
          $(".box").html("");
  
          $("#search").click(function () {
            $(".container").html("");
            dataLoad();
          });
        });
      }
      

  return (
    <>
    <div className="search">
      <input className="inputtitle" type="text" id="query" />
      <button id="reset">X</button>
      <button id="search">검색</button>
    </div>

    <div className="outer">
      <div className="container"></div>
    </div>
    

    <div className="box">검색어를 입력해주세요.</div>
    </>
  );
}

export default App;
