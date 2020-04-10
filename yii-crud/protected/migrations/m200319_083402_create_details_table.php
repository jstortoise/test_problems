<?php

class m200319_083402_create_details_table extends CDbMigration
{
	public function up()
	{
		$this->createTable('tbl_details', array(
            'id' => 'pk',
            'firstName' => 'string NOT NULL',
            'lastName' => 'string NOT NULL',
			'email' => 'string',
			'marks' => 'float',
			'profile' => 'blob',
			'status' => 'boolean'
        ));
	}

	public function down()
	{
		$this->dropTable('tbl_details');
	}

	/*
	// Use safeUp/safeDown to do migration with transaction
	public function safeUp()
	{
	}

	public function safeDown()
	{
	}
	*/
}