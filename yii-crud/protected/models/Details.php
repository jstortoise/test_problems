<?php

class Details extends CActiveRecord
{
    public $firstName;
    public $lastName;
    public $email;
    public $profile;
    public $marks = 0;
    public $status = true;

    public function rules()
    {
        return array(
            array('firstName, lastName, email', 'required'),
            array('email', 'email'),
            array('marks', 'type', 'type' => 'float'),
            array('status', 'boolean'),
            array('profile,', 'file', 'allowEmpty' => true, 'types'=> 'jpg, jpeg, png, gif', 'maxSize' => (1024 * 300))
        );
    }

    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }
 
    public function tableName()
    {
        return 'tbl_details';
    }
}