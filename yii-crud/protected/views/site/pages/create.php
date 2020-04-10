<h1>Create</h1>

<div class="form">
<?php echo CHtml::beginForm('', 'post', array('enctype'=>'multipart/form-data')); ?>
 
    <?php echo CHtml::errorSummary($model); ?>
 
    <div class="row">
        <?php echo CHtml::activeLabel($model, 'firstName'); ?>
        <?php echo CHtml::activeTextField($model, 'firstName') ?>
    </div>
 
    <div class="row">
        <?php echo CHtml::activeLabel($model, 'lastName'); ?>
        <?php echo CHtml::activeTextField($model, 'lastName') ?>
    </div>
 
    <div class="row">
        <?php echo CHtml::activeLabel($model, 'email'); ?>
        <?php echo CHtml::activeTextField($model, 'email') ?>
    </div>
 
    <div class="row">
        <?php echo CHtml::activeLabel($model, 'profile'); ?>
        <?php echo CHtml::activeFileField($model, 'profile'); ?>
    </div>
 
    <div class="row">
        <?php echo CHtml::activeLabel($model, 'marks'); ?>
        <?php echo CHtml::activeTextField($model, 'marks') ?>
    </div>
 
    <div class="row rememberMe">
        <?php echo CHtml::activeCheckBox($model, 'status'); ?>
        <?php echo CHtml::activeLabel($model, 'status'); ?>
    </div>
 
    <div class="row submit">
        <?php echo CHtml::submitButton('Create'); ?>
    </div>
 
<?php echo CHtml::endForm(); ?>
</div><!-- form -->