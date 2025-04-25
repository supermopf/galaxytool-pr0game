<?php
require "_general_header.inc.php";

if (!$_SESSION['s_auth']->get_permission(iAuthorization::permission_cansearch)) {
	$error_page_code = "permission";
	include GALAXYTOOL_ROOT."/secret/errorpage.php";
	exit();
}
$probe_lang = new ProbeLanguages(); // to load language files
$db_array = $probe_lang->get_flipped_probe_array();

echo Layout::make_header(DEBRIS_TITLE);

$store_url = "ajax/ajax_debris.php?type=initial";

echo Layout::start_block(DEBRIS_SEARCH_OPTIONS);
?>
	<div dojoType="dojo.data.ItemFileReadStore" jsId="playerStore" id="playerStore" url="ajax/ajax_players.php?type=all"></div>
	<div dojoType="dojo.data.ItemFileReadStore" jsId="userStore" id="userStore" url="ajax/ajax_users.php?type=all"></div>
	<form id="debris_report" accept-charset="utf-8" dojoType="dijit.form.Form" onSubmit="return galaxytool.Debris.startSearch();">
		<div id="search1" dojoType="dijit.TitlePane" title="<?php echo SHOW_SEARCH; ?>" open="true">
			<table  border="0" cellpadding="5" cellspacing="0" width="100%">
			<tr>
				<td style="width: 20%;"><?php echo DEBRIS_COLLECTOR; ?></td>
				<td style="width: 30%;">
					<input dojoType="dijit.form.ComboBox" store="playerStore" searchAttr="player" name="collector" id="collector" trim="true" style="width:130px;">
				</td>
			</tr>
			<tr>
				<td><?php echo DEBRIS_DATE; ?></td>
				<td colspan="3">
					<input type="text" name="date_from" value="" dojoType="dijit.form.DateTextBox" trim="true" id="date_from" propercase="false" style="width:85px;">
					<span style="margin-left:10px;">-</span>
					<input type="text" name="date_to" value="" dojoType="dijit.form.DateTextBox" trim="true" id="date_to" propercase="false" style="width:85px; margin-left:10px;">
				</td>
			</tr>
			<tr>
				<td style="width: 200px;vertical-align: text-top;"><?php echo SHOW_DF_LONG; ?></td>
				<td><?php echo SHOW_METAL_LONG." ".SHOW_AT_LEAST; ?>
					<input id="metal" type="text" dojoType="dijit.form.NumberTextBox" name="metal" value="" constraints="{min:0,places:0}" style="width: 90px;">
					<span style="padding-left:30px;"><?php echo SHOW_CRYSTAL_LONG." ".SHOW_AT_LEAST; ?></span>
					<input id="crystal" type="text" dojoType="dijit.form.NumberTextBox" name="crystal" value="" constraints="{min:0,places:0}" style="width: 90px;">
					<div style="padding-top: 2px;"><?php echo SHOW_BOTH." ".SHOW_AT_LEAST; ?>
					<input id="both" type="text" dojoType="dijit.form.NumberTextBox" name="both" value="" constraints="{min:0,places:0}" style="width: 90px;">
					</div>
				</td>
			</tr>
			<tr>
				<td><?php echo DEBRIS_COORDINATES; ?></td>
				<td colspan="3">
				<?php echo Layout::get_coordinates_control(); ?>
				</td>
			</tr>
			</table>
		</div>
		<button dojoType="dijit.form.Button" type="submit" id="search_button"><?php echo DEBRIS_SEARCH; ?></button>
	</form>
	<div id="result_view" style="display:none;">
		<table dojoType="dojox.grid.DataGrid" jsId="searchgrid" id="searchgrid" query="{ id: '*' }" selectable="true"
		style="height: 200px; margin: 5 0 0 0;" clientSort="true" rowSelector="20px" selectionMode="single" sortinfo="-4"
		autoHeight="<?php echo $_SESSION['s_auth']->get_setting(iAuthorization::setting_search_results); ?>"
		rowCount="<?php echo $_SESSION['s_auth']->get_setting(iAuthorization::setting_search_results); ?>"
		rowsPerPage="<?php echo (2 * $_SESSION['s_auth']->get_setting(iAuthorization::setting_search_results)); ?>">
		<thead>
			<tr>
				<th width="20px" field="selected" editable="true" cellType="dojox.grid.cells.Bool">&nbsp;</th>
				<th width="60px;" field="coordinates" formatter="galaxytool.Debris.formatAddress"><?php echo SHOW_ADDRESS; ?></th>
				<th width="180px" field="collector" formatter=""><?php echo DEBRIS_COLLECTOR; ?></th>
				<th width="180px" field="collectiontime" formatter="galaxytool.Debris.formatDatetime"><?php echo DEBRIS_DATE; ?></th>
				<th width="180px" field="loot_m" formatter="galaxytool.Debris.formatNumber"><?php echo $db_array['Metal']; ?></th>
				<th width="auto" field="loot_c" formatter="galaxytool.Debris.formatNumber"><?php echo $db_array['Crystal']; ?></th>
			</tr>
		</thead>
	</table>
	</div>
<?php
echo Layout::close_block();
?>
<script type="text/javascript">
var galaxytool_userid = <?php echo $_SESSION['s_auth']->get_setting(iAuthorization::setting_userid); ?>;
var store_url = "<?php echo $store_url; ?>";
</script>
<script type="text/javascript" src="javascript/form_validations.js"></script>
<script type="text/javascript" src="javascript/debris_reports.js"></script>
<?php
echo Layout::make_footer($global_universe,$messages);
?>