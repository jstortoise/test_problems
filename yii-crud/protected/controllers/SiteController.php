<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$users = Details::model()->findAll('status=1');
		$this->render('pages/view', array('users' => $users));
	}

	public function actionView()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$users = Details::model()->findAll('status=1');
		$this->render('pages/view', array('users' => $users));
	}

	public function actionManage()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$users = Details::model()->findAll();
		$this->render('pages/manage', array('users' => $users));
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->user->returnUrl);
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}

	public function actionCreate() {
		$model = new Details;

		if (isset($_POST['Details'])) {
			// collects user input data
			$model->attributes = $_POST['Details'];
			// validates user input and redirect to previous page if validated
			if ($model->validate()) {
				$file = CUploadedFile::getInstance($model, 'profile');
				$file->saveAs(Yii::getPathOfAlias('webroot.images') . '/' . $file->name);

				$user = new Details;
				$user->firstName = $model->attributes['firstName'];
				$user->lastName = $model->attributes['lastName'];
				$user->email = $model->attributes['email'];
				$user->marks = $model->attributes['marks'];
				$user->status = $model->attributes['status'];
				$user->profile = $file->name;
				$user->save();
				$this->redirect(Yii::app()->user->returnUrl);
			}
		}
		// displays the create form
		$this->render('/site/pages/create', array('model' => $model));
	}

	public function actionEdit($id) {
		$user = Details::model()->findByPk($id);
		if (isset($_POST['Details'])) {
			// collects user input data
			$model = new Details;
			$model->attributes = $_POST['Details'];
			// validates user input and redirect to previous page if validated
			if ($model->validate()) {
				$file = CUploadedFile::getInstance($model, 'profile');
				if (isset($file)) {
					$file->saveAs(Yii::getPathOfAlias('webroot.images') . '/' . $file->name);
					$user->profile = $file->name;
				}

				$user->firstName = $model->attributes['firstName'];
				$user->lastName = $model->attributes['lastName'];
				$user->email = $model->attributes['email'];
				$user->marks = $model->attributes['marks'];
				$user->status = $model->attributes['status'];
				$user->save();
				$this->redirect(Yii::app()->user->returnUrl);
			}
		}
		// displays the create form
		$this->render('/site/pages/edit', array('model' => $user));
	}

	public function actionDelete($id) {
		$model = Details::model()->findByPk($id);
		$model->delete();
		$this->redirect(Yii::app()->homeUrl);
	}

	public function actionImage($filename) {
		$path = Yii::getPathOfAlias('webroot.images') . '/';
		$file = $path . $filename;
		if (file_exists($file)) {
			header('Content-Type: image/jpeg');
			readfile($file);
			exit;
		}
	}

}