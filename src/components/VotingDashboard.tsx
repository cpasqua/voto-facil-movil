import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { registerVote, getVotesByFiscal, Fiscal, Vote } from '@/data/mockData';
import { CheckCircle, LogOut, School, Users, Hash } from 'lucide-react';

interface VotingDashboardProps {
  fiscal: Fiscal;
  onLogout: () => void;
}

const VotingDashboard: React.FC<VotingDashboardProps> = ({ fiscal, onLogout }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setVotes(getVotesByFiscal(fiscal.id));
  }, [fiscal.id]);

  const handleRegisterVote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderNum = parseInt(orderNumber);
    if (!orderNum || orderNum <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingrese un número de orden válido",
        variant: "destructive",
      });
      return;
    }

    // Check if vote already exists
    const existingVote = votes.find(vote => vote.orderNumber === orderNum);
    if (existingVote) {
      toast({
        title: "Error",
        description: `El número de orden ${orderNum} ya fue registrado`,
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);

    try {
      const newVote = registerVote(fiscal.id, orderNum, fiscal.school, fiscal.table);
      setVotes(prev => [...prev, newVote]);
      
      toast({
        title: "¡Voto registrado!",
        description: `Número de orden ${orderNum} registrado exitosamente`,
        className: "bg-gradient-success text-success-foreground",
      });
      
      setOrderNumber('');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar el voto",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 shadow-electoral">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">
              Sistema Electoral
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              {fiscal.name}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLogout}
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Fiscal Info */}
        <Card className="shadow-electoral">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <School className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Escuela</p>
                  <p className="font-medium">{fiscal.school}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Mesa</p>
                  <p className="font-medium">{fiscal.table}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vote Registration */}
        <Card className="shadow-electoral">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Hash className="w-5 h-5 text-primary" />
              <span>Registrar Voto</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegisterVote} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Número de Orden</Label>
                <Input
                  id="orderNumber"
                  type="number"
                  placeholder="Ingrese el número de orden"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  min="1"
                  className="h-14 text-lg text-center"
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-gradient-primary hover:bg-primary-light shadow-electoral"
                disabled={isRegistering}
              >
                {isRegistering ? 'Registrando...' : 'Registrar Voto'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Vote Count */}
        <Card className="shadow-electoral">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Votos Registrados</p>
                  <p className="text-2xl font-bold text-success">{votes.length}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-success border-success">
                Activo
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Votes */}
        {votes.length > 0 && (
          <Card className="shadow-electoral">
            <CardHeader>
              <CardTitle className="text-lg">Últimos Votos Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {votes
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .slice(0, 10)
                  .map((vote) => (
                    <div 
                      key={vote.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-success-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Orden #{vote.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {vote.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VotingDashboard;