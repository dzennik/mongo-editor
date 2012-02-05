<?php
/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 10.09.11
 * Time: 23:40
 * To change this template use File | Settings | File Templates.
 */
 
class MongoEditor_Property
{
    protected $_data;

    public function __get($name)
    {
        if ($name[0] === '_') {
            throw new Exception('Can not get access to non-public property');
            //trigger_error('Can not get access to non-public property ' . $name, E_USER_ERROR);
        }


        return $this->{'_' . $name};
    }

    public function __set($name, $value)
    {
        if ($name[0] === '_') {
            throw new Exception('Can not get access to non-public property');
        }

        $this->{'_' . $name} = $value;

        return $this;
    }

    public function setData($data)
    {
        foreach ($data as $key => $value) {
            $this->_setProperty($key, $value);
        }

        $this->_data = $data;
    }

    protected function _setProperty($name, $value)
    {
        if (property_exists($this, '_' . $name)) {
            $this->{'_' . $name} = $value;
            return true;
        }

        if (property_exists($this, $name)) {
            $this->{$name} = $value;
            return true;
        }
        $ccKey = $this->_toCamelCase($name);
        if (property_exists($this, $ccKey)) {
            $this->{$ccKey} = $value;
            return true;
        }

        if (property_exists($this, '_' . $ccKey)) {
            $this->{'_' . $ccKey} = $value;
            return true;
        }

        return false;
    }

    /**
     * Get public properties of this class instance
     * @return array
     */
    public function returnPublicProperties()
    {
        $getFields = create_function('$obj', 'return get_object_vars($obj);');
        return $getFields($this);
    }

    /**
    * Translates a camel case string into a string with underscores (e.g. firstName -&gt; first_name)
    * @param string   $str   String in camel case format
    * @return string   $str   Translated into underscore format
    */
    protected function _fromCamelCase($str) {
        $str[0] = strtolower($str[0]);
        $func = create_function('$c', 'return "_" . strtolower($c[1]);');
        return preg_replace_callback('/([A-Z])/', $func, $str);
    }

    /**
    * Translates a string with underscores into camel case (e.g. first_name -&gt; firstName)
    * @param string $str String in underscore format
    * @param bool $capitaliseFirstChar If true, capitalise the first char in $str
    * @return string $str translated into camel caps
    */
    protected function _toCamelCase($str, $capitaliseFirstChar = false) {
        if($capitaliseFirstChar) {
          $str[0] = strtoupper($str[0]);
        }
        $func = create_function('$c', 'return strtoupper($c[1]);');
        return preg_replace_callback('/_([a-z])/', $func, $str);
    }
}