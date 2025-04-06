import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import DashboardHeader from '@/components/dashboard-header';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getApiConnections,
  createApiConnection,
  updateApiConnection,
  testApiConnection,
  deleteApiConnection
} from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Check, X, RefreshCw } from 'lucide-react';

// Define the schema for the API connection form
const apiConnectionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  service: z.string().min(1, 'Service is required'),
  baseUrl: z.string().url('Please enter a valid URL'),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  description: z.string().optional(),
});

type ApiConnectionForm = z.infer<typeof apiConnectionSchema>;

type ApiConnection = {
  id: number;
  name: string;
  service: string;
  baseUrl: string;
  isActive: boolean;
  lastTested: Date | null;
  apiKey: string | null;
  apiSecret: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  clientId: string | null;
  clientSecret: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  additionalConfig: any;
};

function AdminConnectionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState<ApiConnection | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form setup for creating/editing connections
  const form = useForm<ApiConnectionForm>({
    resolver: zodResolver(apiConnectionSchema),
    defaultValues: {
      name: '',
      service: '',
      baseUrl: '',
      apiKey: '',
      apiSecret: '',
      accessToken: '',
      refreshToken: '',
      clientId: '',
      clientSecret: '',
      description: '',
    },
  });

  // Reset form values when editing a connection
  useEffect(() => {
    if (editingConnection) {
      form.reset({
        name: editingConnection.name,
        service: editingConnection.service,
        baseUrl: editingConnection.baseUrl,
        apiKey: editingConnection.apiKey || '',
        apiSecret: editingConnection.apiSecret || '',
        accessToken: editingConnection.accessToken || '',
        refreshToken: editingConnection.refreshToken || '',
        clientId: editingConnection.clientId || '',
        clientSecret: editingConnection.clientSecret || '',
        description: editingConnection.description || '',
      });
    }
  }, [editingConnection, form]);

  // Query for fetching API connections
  const { data: connections, isLoading, isError } = useQuery({
    queryKey: ['/api/connection'],
    queryFn: () => getApiConnections(),
  });

  // Filtered connections based on the active tab
  const filteredConnections = connections?.filter(
    (connection: ApiConnection) => activeTab === 'all' || connection.service === activeTab
  );

  // Mutation for creating a new API connection
  const createMutation = useMutation({
    mutationFn: createApiConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/connection'] });
      toast({
        title: 'Connection created',
        description: 'API connection has been created successfully.',
      });
      setIsCreateOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create connection: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Mutation for updating an API connection
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<ApiConnectionForm> }) => 
      updateApiConnection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/connection'] });
      toast({
        title: 'Connection updated',
        description: 'API connection has been updated successfully.',
      });
      setIsEditOpen(false);
      setEditingConnection(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update connection: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Mutation for testing an API connection
  const testMutation = useMutation({
    mutationFn: testApiConnection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/connection'] });
      toast({
        title: data.success ? 'Connection successful' : 'Connection failed',
        description: data.message,
        variant: data.success ? 'default' : 'destructive',
      });
    },
    onError: (error) => {
      toast({
        title: 'Test failed',
        description: `Failed to test connection: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Mutation for deleting an API connection
  const deleteMutation = useMutation({
    mutationFn: deleteApiConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/connection'] });
      toast({
        title: 'Connection deleted',
        description: 'API connection has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to delete connection: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Handle form submission for creating a new connection
  const onCreateSubmit = (data: ApiConnectionForm) => {
    createMutation.mutate(data);
  };

  // Handle form submission for updating a connection
  const onEditSubmit = (data: ApiConnectionForm) => {
    if (editingConnection) {
      updateMutation.mutate({
        id: editingConnection.id.toString(),
        data
      });
    }
  };

  // Handle testing a connection
  const handleTestConnection = (id: number) => {
    testMutation.mutate(id.toString());
  };

  // Handle deleting a connection
  const handleDeleteConnection = (id: number) => {
    deleteMutation.mutate(id.toString());
  };

  // Open the edit dialog with connection data
  const handleEditConnection = (connection: ApiConnection) => {
    setEditingConnection(connection);
    setIsEditOpen(true);
  };

  // Determine which fields to show based on the service type
  const getFieldsByService = (service: string) => {
    switch (service) {
      case 'veeva':
        return ['clientId', 'clientSecret', 'accessToken'];
      case 'salesforce':
        return ['clientId', 'clientSecret', 'accessToken'];
      case 'slack':
        return ['apiKey'];
      case 'google':
        return ['clientId', 'clientSecret', 'refreshToken'];
      case 'oncore':
        return ['apiKey'];
      default:
        return ['apiKey', 'apiSecret', 'accessToken', 'refreshToken', 'clientId', 'clientSecret'];
    }
  };

  // Generate service-specific form fields
  const renderServiceFields = (service: string) => {
    const fields = getFieldsByService(service);
    
    return (
      <>
        {fields.includes('apiKey') && (
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input placeholder="Enter API Key" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {fields.includes('apiSecret') && (
          <FormField
            control={form.control}
            name="apiSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Secret</FormLabel>
                <FormControl>
                  <Input placeholder="Enter API Secret" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {fields.includes('clientId') && (
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Client ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {fields.includes('clientSecret') && (
          <FormField
            control={form.control}
            name="clientSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Secret</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Client Secret" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {fields.includes('accessToken') && (
          <FormField
            control={form.control}
            name="accessToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Token</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Access Token" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {fields.includes('refreshToken') && (
          <FormField
            control={form.control}
            name="refreshToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refresh Token</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Refresh Token" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <DashboardHeader title="API Connections" />

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Manage External API Connections</h2>
            <p className="text-gray-500">
              Configure and manage connections to external CRM and productivity services
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>Add New Connection</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create API Connection</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new API connection for external services.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connection Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a name for this connection" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="veeva">Veeva CRM</SelectItem>
                            <SelectItem value="salesforce">Salesforce</SelectItem>
                            <SelectItem value="slack">Slack</SelectItem>
                            <SelectItem value="google">Google Workspace</SelectItem>
                            <SelectItem value="oncore">Oncore</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="baseUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter API base URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          The base URL for the API service (e.g., https://api.example.com)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch('service') && renderServiceFields(form.watch('service'))}
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a description of this connection"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending}>
                      {createMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating
                        </>
                      ) : (
                        'Create Connection'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Connections</TabsTrigger>
            <TabsTrigger value="veeva">Veeva CRM</TabsTrigger>
            <TabsTrigger value="salesforce">Salesforce</TabsTrigger>
            <TabsTrigger value="slack">Slack</TabsTrigger>
            <TabsTrigger value="google">Google Workspace</TabsTrigger>
            <TabsTrigger value="oncore">Oncore</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="text-center py-8 text-red-500">
                Error loading API connections. Please try again.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections?.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No connections found. Create one to get started.
                  </div>
                ) : (
                  filteredConnections?.map((connection: ApiConnection) => (
                    <Card key={connection.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{connection.name}</CardTitle>
                          <Badge
                            variant={connection.isActive ? 'default' : 'destructive'}
                            className="ml-2"
                          >
                            {connection.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          {connection.service.charAt(0).toUpperCase() + connection.service.slice(1)}
                          <span className="text-xs ml-2 text-gray-500">
                            {connection.lastTested
                              ? `Last tested: ${new Date(connection.lastTested).toLocaleDateString()}`
                              : 'Never tested'}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="line-clamp-2 text-gray-600 mb-2">
                          {connection.description || 'No description provided'}
                        </p>
                        <p className="truncate text-xs text-gray-500">URL: {connection.baseUrl}</p>
                      </CardContent>
                      <CardFooter className="bg-gray-50 flex justify-between pt-2">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditConnection(connection)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTestConnection(connection.id)}
                            className={`${
                              connection.isActive ? 'text-green-600' : 'text-amber-600'
                            }`}
                            disabled={testMutation.isPending}
                          >
                            {testMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <RefreshCw className="h-4 w-4 mr-1" /> Test
                              </>
                            )}
                          </Button>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the API
                                connection and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteConnection(connection.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Connection Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit API Connection</DialogTitle>
              <DialogDescription>
                Update the connection details for {editingConnection?.name}.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a name for this connection" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormDescription>
                        Service type cannot be changed after creation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="baseUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter API base URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        The base URL for the API service (e.g., https://api.example.com)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {editingConnection?.service && renderServiceFields(editingConnection.service)}
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a description of this connection"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditOpen(false);
                      setEditingConnection(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating
                      </>
                    ) : (
                      'Update Connection'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminConnectionsPage;