/**
/**
 * @author jc xy
 * @version 1.0.3
 * @date 2013.09.02
 */
// document.domain = "*";
window.NotifyMe = (function(g) {
	var i = {
		n: 0,
		s: '���ѱ���������Ҫ�ٴα�����'
	},
	MessageSucces = {
		n: 1,
		s: '���Ѿ��ɹ����������ǻ��ڻ����ǰͨ��QQ��Ϣ��������'
	},
	MessageBuess = {
		n: 2,
		s: '�ܱ�Ǹ��������ϵͳ��æ�����Ժ����ԣ�'
	};
	var k = function(a) {
		if (a.s === undefined) {
			alert(a)
		} else {
			alert(a.s)
		}
	};
	var l = function(d, e, f) {
		l = d.addEventListener ?
		function(a, b, c) {
			a.addEventListener(b, c, false)
		}: function(a, b, c) {
			a.attachEvent('on' + b, c)
		};
		l(d, e, f)
	};
	function _loadjs(a, b, c) {
		var d = g.createElement("script"),
		nu = navigator.userAgent.toLowerCase(),
		ie = nu.indexOf("msie") != -1,
		e = g.getElementsByTagName('head')[0],
		bFn1 = bFn2 = true,
		f = g.getElementsByTagName("script"),
		j = f.length,
		h = false;
		if (b == null || typeof(b) == 'undefined') {
			bFn1 = false
		}
		if (c == null || typeof(c) == 'undefined') {
			bFn2 = false
		}
		d.src = a;
		d.onloadDone = false;
		if (ie) {
			l(d, "readystatechange",
			function(e) {
				if (("loaded" === d.readyState || "complete" === d.readyState) && !d.onloadDone) {
					d.onloadDone = true;
					if (bFn1) {
						b()
					}
					d.onreadystatechange = null
				}
			});
			if (d.readyState === 'loaded' && d.nextSibling == null) {
				if (bFn2) {
					c()
				}
			}
		} else {
			d.onload = function() {
				d.onloadDone = true;
				if (bFn1) {
					b()
				}
				d.onload = null
			};
			d.onerror = function() {
				if (bFn2) {
					c()
				}
				d.onerror = null
			}
		}
		while (j--) {
			if (f[j].src === a) {
				b();
				h = true;
				break
			}
		}
		if (!h) {
			g.documentElement.firstChild.insertBefore(d, null)
		}
	}
	function _g(e) {
		return g.getElementById(e)
	}
	function _do_submit() {
		LoginManager.submitLogin(function() {
			if (typeof(user_reginfo) !== 'undefined') {
				if (user_reginfo.ret === '0') {
					NotifyMe.myAlert(i);
					return
				}
			}
			_g("formSubmit").submit()
		})
	}
	function _ShowMessageBox(a, b) {
		if (a == 0) {
			if (typeof(user_reginfo) == "undefined") {
				NotifyMe.myAlert(MessageSucces)
			} else {
				NotifyMe.myAlert(i);
				return
			}
		} else if (a == "-2") {
			LoginManager.login()
		} else {
			NotifyMe.myAlert(b)
		}
	}
	function _get_reginfo_succ() {
		if (typeof(user_reginfo) == "undefined") {
			NotifyMe.myAlert(MessageBuess);
			return
		}
		if (user_reginfo.ret == "0") {
			if (typeof(m_display_controls) != "undefined") {
				if (m_display_controls == "") {
					return
				}
			} else {
				return
			}
			return
		} else if (user_reginfo.ret == "-2") {
			parent.LoginManager.login();
			return
		} else if (user_reginfo.ret == "-10") {
			return
		} else {
			NotifyMe.myAlert(user_reginfo.msg);
			return
		}
	}
	function _doReg(a) {
		// _init();
		_g("action_id").value = a;
		if (typeof(LoginManager) !== 'object') {
			// _loadjs("http://ossweb-img.qq.com/images/js/login/loginmanagerv3.js", _do_submit)
		} else {
			_do_submit()
		}
	}
	return {
		doReg: _doReg,
		myAlert: k,
		ShowMessageBox: _ShowMessageBox
	}
})(document);
window.doReg = NotifyMe.doReg;
window.ShowMessageBox = NotifyMe.ShowMessageBox;
/*  |xGv00|d7be8fe1275efc164cc0efa2471ebd5f */
