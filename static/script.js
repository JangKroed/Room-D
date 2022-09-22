

$(document).ready(function () {
            if (!document.cookie) {
                $("#logout").toggleClass("is-hidden")
                $("#logout-my").toggleClass("is-hidden")
            } else {
                $("#login").toggleClass("is-hidden")
                $("#loin-my").toggleClass("is-hidden")
            }
        })

    $(document).ready(function () {

        // Check for click events on the navbar burger icon
        $(".navbar-burger").click(function () {

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");

        });
    });


        function loginBtn() {
            window.location.href = "/login"
        }
        function loginMy() {
            window.location.href = "/login"
        }

        function logoutBtn() {
            $.removeCookie('mytoken', {path: '/'});
            alert('로그아웃!')
            window.location.href = "/"
            $("#help-id").toggleClass("is-hidden")
        }
        // function logoutMy() {
        //     window.location.href = "/user/{{ user_info.username }}"
        //     $("#help-id").toggleClass("is-hidden")
        // }


function toggle_like(post_id, type) {
            console.log(post_id, type)
            let $a_like = $(`#${post_id} a[aria-label='heart']`)
            let $i_like = $a_like.find("i")
            if ($i_like.hasClass("fa-heart")) {
                $.ajax({
                    type: "POST",
                    url: "/update_like",
                    data: {
                        post_id_give: post_id,
                        type_give: type,
                        action_give: "unlike"
                    },
                    success: function (response) {
                        console.log("unlike")
                        $i_like.addClass("fa-heart-o").removeClass("fa-heart")
                        $a_like.find("span.like-num").text(num2str(response["count"]))
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: "/update_like",
                    data: {
                        post_id_give: post_id,
                        type_give: type,
                        action_give: "like"
                    },
                    success: function (response) {
                        console.log("like")
                        $i_like.addClass("fa-heart").removeClass("fa-heart-o")
                        $a_like.find("span.like-num").text(num2str(response["count"]))
                    }
                })

            }
        }

        function post() {
                let comment = $("#textarea-post").val()
                let today = new Date().toISOString()

                let file = $('#file-up')[0].files[0]
                let form_data = new FormData()

                form_data.append("file_give", file)
                form_data.append("comment_give", comment)
                form_data.append("date_give", today)
                console.log(comment, today, file, form_data)

                $.ajax({
                    type: "POST",
                    url: "/posting",
                    data: form_data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        $("#modal-post").removeClass("is-active")
                        window.location.reload()
                    }
                })
            }


        {
        //     #시간
        //     나타내기
        // #
        }

        function time2str(date) {
            let today = new Date()
            let time = (today - date) / 1000 / 60  // 분

            if (time < 60) {
                return parseInt(time) + "분 전"
            }
            time = time / 60  // 시간
            if (time < 24) {
                return parseInt(time) + "시간 전"
            }
            time = time / 24
            if (time < 7) {
                return parseInt(time) + "일 전"
            }
            return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
        }

        {
        //     #실시간
        //     조아요
        //     개수
        //     요약
        // #
        }

        function num2str(count) {
            if (count > 10000) {
                return parseInt(count / 1000) + "k"
            }
            if (count > 500) {
                return parseInt(count / 100) / 10 + "k"
            }
            if (count == 0) {
                return ""
            }
            return count
        }

        {
        //     #포스트
        //     가져오기
        // #
        }

        function get_posts(username) {
            if (username == undefined) {
                username = ""
            }
            $("#cards-box").empty()
            $.ajax({
                type: "GET",
                url: `/get_posts?username_give=${username}`,
                data: {},
                success: function (response) {
                    if (response["result"] == "success") {
                        let posts = response["posts"]
                        for (let i = 0; i < posts.length; i++) {
                            let post = posts[i]
                            let time_post = new Date(post["date"])
                            let time_before = time2str(time_post)
                            let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                            let count_heart = post['count_heart']

                            let html_temp = `<div class="card" id="${post["_id"]}">
                                                <img src="/static/${post['file']}" class="card-img-top" alt="Image"/>

                                                    <div class="card-body">
                                                            <div class="media-left">
                                                                <a class="image is-64x64" href="/user/${post['username']}">
                                                                    <img class="is-rounded" src="/static/${post['profile_pic_real']}"
                                                                         alt="Image">
                                                                </a>
                                                            </div>
                                                            <div class="media-content">
                                                                <div class="content">
                                                                    <p>
                                                                        <strong>${post['profile_name']}</strong> <small>@${post['username']}</small> <small>${time_before}</small>
                                                                        <br>
                                                                        ${post['comment']}
                                                                    </p>
                                                                </div>
                                                                <nav class="level is-mobile">
                                                                    <div class="level-left">
                                                                        <a class="level-item is-sparta" aria-label="heart"
                                                                           onclick="toggle_like('${post['_id']}', 'heart')">
                                                                                                <span class="icon is-small"><i class="fa ${class_heart}"
                                                                                                                               aria-hidden="true"></i></span>&nbsp;<span
                                                                                class="like-num">${num2str(count_heart)}</span>
                                                                        </a>
                                                                    
                                                                    </div>

                                                                </nav>
                                                            </div>
                                                     </div>
                                                </div>`
                                                        $("#cards-box").append(html_temp)
                        }
                    }
                }
            })
        }

        function open_box() {
            $('#cards-box').show()
        }

        function close_box() {
            $('#cards-box').hide()
        }




//이미지 미리보기//
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
            document.getElementById('preview1').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
        document.getElementById('preview1').src = "";
    }
}

