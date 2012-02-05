<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 04.01.12
 * Time: 17:44
 * To change this template use File | Settings | File Templates.
 */

// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

defined('PROJECT_PATH')
    || define('PROJECT_PATH', realpath(dirname(__FILE__) . '/../'));

defined('PUBLIC_PROJECT_PATH')
    || define('PUBLIC_PROJECT_PATH', realpath(dirname(__FILE__) . '/'));

//defined('LIBRARY_PATH')
//    || define('LIBRARY_PATH', realpath(dirname(__FILE__) . '/../library'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'development'));

// Ensure library/ is on include_path
set_include_path(
    implode(PATH_SEPARATOR, array(
        realpath(APPLICATION_PATH),
        realpath(APPLICATION_PATH . '/../model'),
        get_include_path()
    ))
);

require_once 'model/MongoEditor/Application.php';

global $app;
global $db;

$app = MongoEditor_Application::getInstance();
$db  = $app->getDB();