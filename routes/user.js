var express = require('express');
var router = express.Router();

//mysql
var mysql = require('mysql');

//db
var client = mysql.createConnection({
	user : 'root',
	password : '123qwe'
});

client.query('USE App');

router.post('/login', function(req, res, next) {
	var email = req.body.e_mail;
	var userPhone = req.body.phone_number;
	var accessToken = req.body.access_token;

	client.query('select * from USER where email = ?',[email], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ 
			//not join
			if(result.length == 0)
			{
				client.query('insert into USER (email, phone_number, request) values (?, ?)', [email, userPhone, 0], function(err, result, fields){
					if(err)
					{
						res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						});
					}
					else
					{

						res.json({
							success : '1',
							message : 'OK',
							result : result.insertId
						});
					}
				});
			}
			else	//already join
			{ res.json(
				{
					success : '1',
					message : 'OK',
					result : null
				});
			}
		}
	});
});

router.post('/profile', function(req, res, next) {
	var userId = req.body.user_id;
	client.query('select * from USER where user_id = ?',[userId], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : result
			});
		}
	});
});

router.post('/uploadprofile', function(req, res, next) {
	var userId = req.body.user_id;
	var userName = req.body.user_name;
	var userPhone = req.body.user_phone;
	var userBirth = req.body.user_birth;
	var userProfileURL = req.body.user_profile_url;	

	client.query('insert into USER (user_id, user_name, phone_number, profile_pic_url, birthday) values (?, ?, ?, ?, ?)',
		[userId, userName, userPhone, userProfileURL, userBirth], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : null
			});
		}
	});
});

router.post('/dropout', function(req, res, next) {
	var userId = req.body.user_id;

	client.query('delete ',
		[userId, userName, userPhone, userProfileURL, userBirth], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : null
			});
		}
	});
});

module.exports = router;