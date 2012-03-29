<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 04.01.12
 * Time: 17:23
 * To change this template use File | Settings | File Templates.
 */

require_once('init.php');

$controller = $_GET['controller'];
$action     = $_GET['action'];

$handler = new MongoEditor_Handler($controller, $action, $_POST, $_GET);

$data = $handler->execute();

echo json_encode($data);