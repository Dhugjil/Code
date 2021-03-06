﻿var bootstrap = function (a, h) {
    var i = {
        init: function () {
            this.load();
            this.bind()
        },
        load: function () {
            var A = h.clientdata.get(["modulesTree"]);
            var B = "0";
            var z = A[B] || [];
            var o = a('<ul class="lr-first-menu-list"></ul>');
            for (var t = 0,
                w = z.length; t < w; t++) {
                var u = z[t];
                if (u.F_IsMenu == 1) {
                    var n = a("<li></li>");
                    if (!!u.F_Description) {
                        n.attr("title", u.F_Description)
                    }
                    var y = '<a id="' + u.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item">';
                    y += '<i class="' + u.F_Icon + ' lr-menu-item-icon"></i>';
                    y += '<span class="lr-menu-item-text">' + u.F_FullName + "</span>";
                    y += '<span class="lr-menu-item-arrow"><i class="fa fa-angle-left"></i></span></a>';
                    n.append(y);
                    var F = A[u.F_ModuleId] || [];
                    var q = a('<ul class="lr-second-menu-list"></ul>');
                    var E = false;
                    for (var v = 0,
                        G = F.length; v < G; v++) {
                        var C = F[v];
                        if (C.F_IsMenu == 1) {
                            E = true;
                            var p = a("<li></li>");
                            if (!!C.F_Description) {
                                p.attr("title", C.F_Description)
                            }
                            var D = '<a id="' + C.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item" >';
                            D += '<i class="' + C.F_Icon + ' lr-menu-item-icon"></i>';
                            D += '<span class="lr-menu-item-text">' + C.F_FullName + "</span>";
                            D += "</a>";
                            p.append(D);
                            var K = A[C.F_ModuleId] || [];
                            var s = a('<ul class="lr-three-menu-list"></ul>');
                            var J = false;
                            for (var x = 0,
                                L = K.length; x < L; x++) {
                                var H = K[x];
                                if (H.F_IsMenu == 1) {
                                    J = true;
                                    var r = a("<li></li>");
                                    r.attr("title", H.F_FullName);
                                    var I = '<a id="' + H.F_ModuleId + '" href="javascript:void(0);" class="lr-menu-item" >';
                                    I += '<i class="' + H.F_Icon + ' lr-menu-item-icon"></i>';
                                    I += '<span class="lr-menu-item-text">' + H.F_FullName + "</span>";
                                    I += "</a>";
                                    r.append(I);
                                    s.append(r)
                                }
                            }
                            if (J) {
                                p.addClass("lr-meun-had");
                                p.find("a").append('<span class="lr-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                p.append(s)
                            }
                            q.append(p)
                        }
                    }
                    if (E) {
                        n.append(q)
                    }
                    o.append(n)
                }
            }
            a("#lr_frame_menu").html(o);
            a(".lr-menu-item-text").each(function () {
                var m = a(this);
                var M = m.text();
                h.language.get(M,
                    function (N) {
                        m.text(N);
                        m.parent().parent().attr("title", N)
                    })
            })
        },
        bind: function () {
            a("#lr_frame_menu").lrscroll();
            a("#lr_frame_menu_btn").on("click",
                function () {
                    var m = a("body");
                    if (m.hasClass("lr-menu-closed")) {
                        m.removeClass("lr-menu-closed")
                    } else {
                        m.addClass("lr-menu-closed")
                    }
                });
            a("#lr_frame_menu a").hover(function () {
                if (a("body").hasClass("lr-menu-closed")) {
                    var m = a(this).attr("id");
                    var n = a("#" + m + ">span").text();
                    layer.tips(n, a(this))
                }
            },
                function () {
                    if (a("body").hasClass("lr-menu-closed")) {
                        layer.closeAll("tips")
                    }
                });
            a(".lr-frame-personCenter .dropdown-toggle").hover(function () {
                if (a("body").hasClass("lr-menu-closed")) {
                    var m = a(this).text();
                    layer.tips(m, a(this))
                }
            },
                function () {
                    if (a("body").hasClass("lr-menu-closed")) {
                        layer.closeAll("tips")
                    }
                });
            a("#lr_frame_menu a").on("click",
                function () {
                    var m = a(this);
                    var p = m.attr("id");
                    var o = h.clientdata.get(["modulesMap", p]);
                    switch (o.F_Target) {
                        case "iframe":
                            if (h.validator.isNotNull(o.F_UrlAddress).code) {
                                h.frameTab.open(o)
                            } else { }
                            break;
                        case "expand":
                            var n = m.next();
                            if (n.is(":visible")) {
                                n.slideUp(500,
                                    function () {
                                        m.removeClass("open")
                                    })
                            } else {
                                if (n.hasClass("lr-second-menu-list")) {
                                    a("#lr_frame_menu .lr-second-menu-list").slideUp(300,
                                        function () {
                                            a(this).prev().removeClass("open")
                                        })
                                } else {
                                    n.parents(".lr-second-menu-list").find(".lr-three-menu-list").slideUp(300,
                                        function () {
                                            a(this).prev().removeClass("open")
                                        })
                                }
                                n.slideDown(300,
                                    function () {
                                        m.addClass("open")
                                    })
                            }
                            break
                    }
                })
        }
    };
    i.init();
    var b = {};
    var c = {};
    var l = {};
    var g = "";
    var d = function (n) {
        var m = top.$.rootUrl;
        switch (n.img) {
            case "0":
                m += "/Content/images/head/on-girl.jpg";
                break;
            case "1":
                m += "/Content/images/head/on-boy.jpg";
                break;
            default:
                m += "/LR_OrganizationModule/User/GetImg?userId=" + n.id;
                break
        }
        return m
    };
    var k = function (n, o) {
        var m = h.clientdata.get(["userinfo"]);
        h.clientdata.getAsync("user", {
            key: m.userId,
            callback: function (q, r) {
                q.id = r.key;
                var p = '                <div class="me im-time">' + (o || "") + '</div>                <div class="im-me">                    <div class="headimg"><img src="' + d(q) + '"></div>                    <div class="arrow"></div>                    <span class="content">' + n + "</span>                </div>";
                a(".lr-im-msgcontent .lr-scroll-box").append(p);
                a(".lr-im-msgcontent").lrscrollSet("moveBottom")
            }
        })
    };
    var j = function (o, m, n) {
        h.clientdata.getAsync("user", {
            key: o,
            callback: function (q, r) {
                q.id = r.key;
                var p = '                <div class="im-time">' + (n || "") + '</div>                <div class="im-other">                    <div class="headimg"><img src="' + d(q) + '"></div>                    <div class="arrow"></div>                    <span class="content">' + m + "</span>                </div>";
                a(".lr-im-msgcontent .lr-scroll-box").append(p);
                a(".lr-im-msgcontent").lrscrollSet("moveBottom")
            }
        })
    };
    var e = function (o) {
        var n = new Date();
        var m = n.DateDiff("d", o);
        if (m <= 1) {
            return h.formatDate(o, "hh:mm:ss")
        } else {
            return h.formatDate(o, "yyyy/MM/dd")
        }
    };
    var f = {
        init: function () {
            this.bind();
            this.load()
        },
        load: function () {
            h.clientdata.getAllAsync("company", {
                callback: function (n) {
                    a.each(n,
                        function (o, p) {
                            b[p.parentId] = b[p.parentId] || [];
                            p.id = o;
                            b[p.parentId].push(p)
                        });
                    var m = a("#lr_im_content_userlist .lr-scroll-box");
                    a.each(b["0"],
                        function (p, q) {
                            var o = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-company" data-value="' + q.id + '"  data-deep="0" >                                    <i class="fa fa-angle-right"></i>' + q.name + "                                </div>                            </div>";
                            m.append(o)
                        });
                    h.clientdata.getAllAsync("department", {
                        callback: function (o) {
                            a.each(o,
                                function (p, q) {
                                    q.id = p;
                                    if (q.parentId == "0") {
                                        c[q.companyId] = c[q.companyId] || [];
                                        c[q.companyId].push(q)
                                    } else {
                                        c[q.parentId] = c[q.parentId] || [];
                                        c[q.parentId].push(q)
                                    }
                                });
                            h.clientdata.getAllAsync("user", {
                                callback: function (p) {
                                    a.each(p,
                                        function (q, r) {
                                            r.id = q;
                                            if (r.departmentId) {
                                                l[r.departmentId] = l[r.departmentId] || [];
                                                l[r.departmentId].push(r)
                                            } else {
                                                if (r.companyId) {
                                                    l[r.companyId] = l[r.companyId] || [];
                                                    l[r.companyId].push(r)
                                                }
                                            }
                                        });
                                    h.im.getContacts(function (r) {
                                        var q = a("#lr_immsg_userlist .lr-scroll-box");
                                        a.each(r,
                                            function (s, t) {
                                                var u = '                                            <div class="msg-item' + (t.F_IsRead == "1" ? "imHasMsg" : "") + '" data-value="' + t.F_OtherUserId + '" >                                                <div class="photo">                                                    <img src="' + top.$.rootUrl + '/Content/images/head/on-boy.jpg">                                                    <div class="point"></div>                                                </div>                                                <div class="name"></div>                                                <div class="msg">' + (t.F_Content || "") + '</div>                                                <div class="date">' + e(t.F_Time) + "</div>                                            </div>";
                                                q.append(u);
                                                h.clientdata.getAsync("user", {
                                                    key: t.F_OtherUserId,
                                                    callback: function (w, x) {
                                                        var v = q.find('[data-value="' + x.key + '"]');
                                                        v.find(".name").text(w.name);
                                                        w.id = x.key;
                                                        v.find("img").attr("src", d(w));
                                                        v = null
                                                    }
                                                })
                                            })
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        bind: function () {
            a("#lr_immsg_userlist").lrscroll();
            a("#lr_im_content_userlist").lrscroll();
            a(".lr-im-msgcontent").lrscroll();
            a(".lr-im-bell").on("click",
                function () {
                    var m = a(this);
                    if (m.hasClass("open")) {
                        m.removeClass("open");
                        a(".lr-im-body").removeClass("open");
                        a(".lr-im-black-overlay").hide();
                        g = ""
                    } else {
                        m.addClass("open");
                        a(".lr-im-bell .point").hide();
                        a(".lr-im-body").addClass("open")
                    }
                });
            a(".lr-im-title .title-item").on("click",
                function () {
                    var m = a(this);
                    if (!m.hasClass("active")) {
                        a(".lr-im-body>.active").removeClass("active");
                        a(".lr-im-title>.active").removeClass("active");
                        m.addClass("active");
                        var n = m.attr("data-value");
                        a("#" + n).addClass("active")
                    }
                });
            a("#lr_im_content_userlist .lr-scroll-box").on("click",
                function (s) {
                    s = s || window.event;
                    var t = s.target || s.srcElement;
                    var m = a(t);
                    if (t.tagName == "IMG" || t.tagName == "I") {
                        m = m.parent()
                    }
                    if (m.hasClass("lr-im-company")) {
                        if (m.hasClass("open")) {
                            m.removeClass("open");
                            m.parent().find(".lr-im-user-list").remove()
                        } else {
                            var v = m.attr("data-value");
                            var r = parseInt(m.attr("data-deep"));
                            var n = a('<div class="lr-im-user-list" ></div>');
                            n.css({
                                "padding-left": "10px"
                            });
                            var u = false;
                            a.each(l[v] || [],
                                function (y, z) {
                                    var x = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-user" data-value="' + z.id + '" >                                     <img src="' + d(z) + '" >' + z.name + "                                </div>                            </div>";
                                    n.append(x);
                                    u = true
                                });
                            a.each(c[v] || [],
                                function (y, z) {
                                    var x = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-department" data-value="' + z.id + '"  data-deep="' + (r + 1) + '" >                                    <i class="fa fa-angle-right"></i>' + z.name + "                                </div>                            </div>";
                                    n.append(x);
                                    u = true
                                });
                            a.each(b[v] || [],
                                function (y, z) {
                                    var x = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-company" data-value="' + z.id + '"  data-deep="' + (r + 1) + '" >                                    <i class="fa fa-angle-right"></i>' + z.name + "                                </div>                            </div>";
                                    n.append(x);
                                    u = true
                                });
                            if (u) {
                                m.parent().append(n)
                            }
                            m.addClass("open")
                        }
                        return false
                    } else {
                        if (m.hasClass("lr-im-department")) {
                            if (m.hasClass("open")) {
                                m.removeClass("open");
                                m.parent().find(".lr-im-user-list").remove()
                            } else {
                                var v = m.attr("data-value");
                                var r = parseInt(m.attr("data-deep"));
                                var n = a('<div class="lr-im-user-list" ></div>');
                                n.css({
                                    "padding-left": "10px"
                                });
                                var u = false;
                                a.each(l[v] || [],
                                    function (y, z) {
                                        var x = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-user" data-value="' + z.id + '" >                                     <img src="' + d(z) + '" >' + z.name + "                                </div>                            </div>";
                                        n.append(x);
                                        u = true
                                    });
                                a.each(c[v] || [],
                                    function (y, z) {
                                        var x = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-department" data-value="' + z.id + '"  data-deep="' + (r + 1) + '" >                                    <i class="fa fa-angle-right"></i>' + z.name + "                                </div>                            </div>";
                                        n.append(x);
                                        u = true
                                    });
                                if (u) {
                                    m.parent().append(n)
                                }
                                m.addClass("open")
                            }
                        } else {
                            if (m.hasClass("lr-im-user")) {
                                var v = m.attr("data-value");
                                var p = a("#lr_immsg_userlist .lr-scroll-box");
                                var o = p.find('[data-value="' + v + '"]');
                                a(".lr-im-title .title-item").eq(0).trigger("click");
                                g = v;
                                if (o.length > 0) {
                                    p.prepend(o);
                                    o.trigger("click")
                                } else {
                                    var w = m.find("img").attr("src");
                                    var q = '                            <div class="msg-item" data-value="' + v + '" >                                <div class="photo">                                    <img src="' + w + '">                                    <div class="point"></div>                                </div>                                <div class="name"></div>                                <div class="msg"></div>                                <div class="date"></div>                            </div>';
                                    p.prepend(q);
                                    o = p.find('[data-value="' + v + '"]');
                                    h.clientdata.getAsync("user", {
                                        key: v,
                                        callback: function (x, y) {
                                            p.find('[data-value="' + y.key + '"] .name').text(x.name);
                                            o.trigger("click")
                                        }
                                    });
                                    h.im.addContacts(v)
                                }
                            }
                        }
                    }
                });
            a("#lr_immsg_userlist .lr-scroll-box").on("click",
                function (o) {
                    o = o || window.event;
                    var p = o.target || o.srcElement;
                    var m = a(p);
                    if (!m.hasClass("msg-item")) {
                        m = m.parents(".msg-item")
                    }
                    if (m.length > 0) {
                        if (!m.hasClass("active")) {
                            var q = m.find(".name").text();
                            g = m.attr("data-value");
                            a("#lr_immsg_userlist .lr-scroll-box .active").removeClass("active");
                            m.addClass("active");
                            a(".lr-im-black-overlay").show();
                            var n = a(".lr-im-dialog");
                            n.find(".im-title").text("与" + q + "对话中");
                            a("#lr_im_input").val("");
                            a("#lr_im_input").select();
                            a(".lr-im-msgcontent .lr-scroll-box").html("");
                            h.im.getMsgList(g,
                                function (s) {
                                    var u = s.length;
                                    if (u > 0) {
                                        for (var t = u - 1; t >= 0; t--) {
                                            var r = s[t];
                                            h.clientdata.getAsync("user", {
                                                key: r.userId,
                                                msg: r.content,
                                                time: r.time,
                                                callback: function (w, y) {
                                                    w.id = y.key;
                                                    var x = h.clientdata.get(["userinfo"]);
                                                    var v = '                                            <div class="im-time ' + (x.userId == y.key ? "me" : "") + ' ">' + y.time + '</div>                                            <div class="' + (x.userId == y.key ? "im-me" : "im-other") + '">                                                <div class="headimg"><img src="' + d(w) + '"></div>                                                <div class="arrow"></div>                                                <span class="content">' + y.msg + "</span>                                            </div>";
                                                    a(".lr-im-msgcontent .lr-scroll-box").prepend(v)
                                                }
                                            })
                                        }
                                        a(".lr-im-msgcontent").lrscrollSet("moveBottom")
                                    }
                                },
                                m.hasClass("imHasMsg"));
                            m.removeClass("imHasMsg");
                            h.im.updateContacts(g)
                        }
                    }
                });
            a(".lr-im-search input").on("keypress",
                function (o) {
                    o = o || window.event;
                    if (o.keyCode == "13") {
                        var n = a(this);
                        var p = n.val();
                        var m = a("#lr_im_content_userlist .lr-scroll-box");
                        m.html("");
                        if (p) {
                            h.clientdata.getAllAsync("user", {
                                callback: function (q) {
                                    a.each(q,
                                        function (s, t) {
                                            if (t.name.indexOf(p) != -1) {
                                                t.id = s;
                                                var r = '                                        <div class="lr-im-company-item">                                            <div class="lr-im-item-name lr-im-user" data-value="' + t.id + '" >                                                 <img src="' + d(t) + '" >' + t.name + "                                            </div>                                        </div>";
                                                m.append(r)
                                            }
                                        })
                                }
                            })
                        } else {
                            a.each(b["0"],
                                function (r, s) {
                                    var q = '                            <div class="lr-im-company-item">                                <div class="lr-im-item-name lr-im-company" data-value="' + s.id + '"  data-deep="0" >                                    <i class="fa fa-angle-right"></i>' + s.name + "                                </div>                            </div>";
                                    m.append(q)
                                })
                        }
                    }
                });
            a("#lr_im_input").on("keypress",
                function (n) {
                    n = n || window.event;
                    if (n.keyCode == "13") {
                        var o = a(this).val();
                        a(this).val("");
                        if (o.replace(/(^\s*)|(\s*$)/g, "") != "") {
                            var p = h.im.sendMsg(g, o);
                            k(o, p);
                            var m = a('#lr_immsg_userlist .lr-scroll-box [data-value="' + g + '"]');
                            m.find(".msg").text(o);
                            m.find(".date").text(e(h.getDate("yyyy-MM-dd hh:mm:ss")));
                            m = null
                        }
                        return false
                    }
                });
            h.im.registerRevMsg(function (r, q, o) {
                var n = a("#lr_immsg_userlist .lr-scroll-box");
                var m = n.find('[data-value="' + r + '"]');
                if (r == g) {
                    j(r, q, o);
                    h.im.updateContacts(r);
                    m.find(".msg").text(q);
                    m.find(".date").text(e(o))
                } else {
                    if (m.length > 0) {
                        n.prepend(m);
                        if (!m.hasClass("imHasMsg")) {
                            m.addClass("imHasMsg")
                        }
                        m.find(".msg").text(q);
                        m.find(".date").text(e(o))
                    } else {
                        var p = '                            <div class="msg-item" data-value="' + r + '" >                                <div class="photo">                                    <img src="' + top.$.rootUrl + '/Content/images/head/on-boy.jpg">                                    <div class="point"></div>                                </div>                                <div class="name"></div>                                <div class="msg">' + q + '</div>                                <div class="date">' + e(o) + "</div>                            </div>";
                        n.prepend(p);
                        h.clientdata.getAsync("user", {
                            key: r,
                            callback: function (t, u) {
                                var s = n.find('[data-value="' + u.key + '"]');
                                s.find(".name").text(t.name);
                                t.id = u.key;
                                s.find("img").attr("src", d(t));
                                s = null
                            }
                        })
                    }
                }
                if (!a(".lr-im-bell").hasClass("open")) {
                    a(".lr-im-bell .point").show()
                }
            });
            a("#lr_im_look_msg_btn").on("click",
                function () {
                    h.layerForm({
                        id: "LookMsgIndex",
                        title: "查看聊天记录-" + a("#lr_im_msglist .lr-im-right .lr-im-touser").text(),
                        url: top.$.rootUrl + "/LR_IM/IMMsg/Index?userId=" + g,
                        width: 800,
                        height: 500,
                        maxmin: true,
                        btn: null
                    })
                });
            a(".im-close").on("click",
                function () {
                    a('#lr_immsg_userlist .lr-scroll-box [data-value="' + g + '"]').removeClass("active");
                    a(".lr-im-black-overlay").hide();
                    g = ""
                })
        }
    };
    f.init()
};