<?php

$a = "AMITABH BACHAN";

$b = "RAJNIKANTH" ;

$count = 0;

for($i = 0 ; $i < strlen($a) ; $i++)
{ 
  for($j = 0 ; $j < strlen($b)  ; $j++)
  {
  
    if($a[$i] == $b[$j])
	{
		$count++ ;
		break ;
	}	
}
}

echo $count ;

?>