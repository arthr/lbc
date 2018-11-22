<?php
namespace App\Traits\Lineage;


trait LineageCacheD
{
    protected $webadmin = 'Admin';
    protected $connected;

    protected $fsockerror = false;
    protected $socketerrors = array(
        "1" => true, "01" => false, "02" => false, "03" => false, "04" => false,
        "05" => false, "06" => false, "07" => false, "08" => false, "09" => false,
        "010" => false, "011" => false, "012" => false, "013" => false, "014" => false,
        "015" => false, "016" => false, "017" => false, "018" => false, "019" => false,
        "020" => false, "021" => false, "022" => false, "023" => false, "024" => false,
        "025" => false, "026" => false
    );

    protected function tounicode($string)
    {
        $rs = "";
        for ($i = 0; $i < strlen($string); $i++) {
            $rs .= $string[$i] . chr(0);
        }
        $rs .= chr(0) . chr(0);
        return ($rs);
    }

    protected function CacheDInteractive($buf)
    {
        $fp = fsockopen(env('DNS'), env('CACHED_PORT'), $errno, $errstr, 5);
        $rs = "";
        if (!$fp) {
            $this->connected = false;
            return $this->fsockerror;
        } else $this->connected = true;

        $packet = pack("s", (strlen($buf) + 2)) . $buf;
        fwrite($fp, $packet);
        $len = unpack("v", fread($fp, 2));
        $rid = unpack("c", fread($fp, 1));
        for ($i = 0; $i < (($len[1] - 4) / 4); $i++) {
            $read = unpack("i", fread($fp, 4));
            $rs .= $read[1];
        }
        fclose($fp);
        $result = $this->socketerrors[$rs];
        return ($result);
    }

    public function setInstantAnnouncePacket($text)
    {
        $buf = pack("c", 70);
        $buf .= $this->tounicode($text);
        $buf .= $this->tounicode($this->webadmin);
        return $this->CacheDInteractive($buf);
    }

    public function setNobless($char_id)
    {
        $buf = pack("cVV", 106, $char_id, 1) . $this->tounicode($this->webadmin);
        return $this->CacheDInteractive($buf);
    }

    public function sendPrivateAnnouncePacket($char_id, $text)
    {
        $buf = pack("c", 101);
        $buf .= pack("V", $char_id);
        $buf .= $this->tounicode($text);
        $buf .= $this->tounicode($this->webadmin);
        return $this->CacheDInteractive($buf);
    }
}