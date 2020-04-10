<h1>Manage</h1>

<?php echo CHtml::button('Create', array('submit' => array('site/create'), 'style' => 'margin-bottom: 10px')); ?>

<table>
	<thead>
		<tr>
			<th>#</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email Address</th>
			<th>Profile Picture</th>
			<th>Marks</th>
			<th>Status</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		<?php
			$index = 0;
			foreach ($users as $user):
				$index++;
		?>
			<tr>
				<td><?= $index?></td>
				<td><?= $user->firstName ?></td>
				<td><?= $user->lastName ?></td>
				<td><?= $user->email ?></td>
				<td>
					<?= CHtml::link($user->profile, array('site/image', 'filename' => $user->profile)) ?>
				</td>
				<td><?= $user->marks ?></td>
				<td><?= $user->status ? 'Active' : 'Inactive' ?></td>
				<td>
					<?= CHtml::link('Edit', array('site/edit', 'id' => $user->id)) ?>
					| 
					<?= CHtml::link('Delete', array('site/delete', 'id' => $user->id)) ?>
				</td>
			</tr>
		<?php endforeach;?>
	</tbody>
</table>